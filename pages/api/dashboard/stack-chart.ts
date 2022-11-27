import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface HASIL {
    id: string;
    name: string;
    data: any
}

const apiStackLine = async (req: NextApiRequest, res: NextApiResponse) => {

    const keyword: any = await prisma.keyword.findMany({
        select: {
            id: true,
            name: true
        }
    })

    for (let itm of keyword) {
        itm.data = await prisma.$queryRaw`
        SELECT DAYNAME(createdAt) as name, COUNT(*) as value
        from GoogleNews
        WHERE GoogleNews.keywordId = ${itm.id}
        GROUP BY DAYOFWEEK(createdAt)
        `
    }

    // const result: [] = await prisma.$queryRaw`
    // SELECT DAYNAME(createdAt) as name, COUNT(*) as value
    // FROM FacebookLike 
    // JOIN Keyword 
    // on FacebookLike.keywordId  = Keyword.id 
    // GROUP BY DAYOFWEEK(createdAt)
    // `


    const hasil = JSON.stringify(
        keyword,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
    )

    res.status(200).json(JSON.parse(hasil));

}

export default apiStackLine;
