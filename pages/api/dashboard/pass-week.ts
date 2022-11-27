import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import moment from 'moment'
const prisma = new PrismaClient()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const data: any[] = await prisma.keyword.findMany({
        select: {
            id: true,
            name: true
        }
    })

    for (let itm of data) {
        itm.data = await prisma.googleNews.count({
            where: {
                createdAt: {
                    gte: new Date(Date.parse(moment().subtract(1, 'w').format("YYYY-MM-DD").toString())),
                    lte: new Date(),
                },
                keywordId: {
                    equals: itm.id
                }
            },
        })
    }

    // console.log(new Date(Date.parse(moment().subtract(1, 'w').format("YYYY-MM-DD").toString())),)
    res.status(200).json(data);
}

export default handler;
