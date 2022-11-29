import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();


const dataCountYesterday = async (req: NextApiRequest, res: NextApiResponse) => {
    const fb = await prisma.facebookLike.count({
        where: {
            createdAt: {
                gte: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
                lte: new Date()
            }
        }
    })
    const twt = await prisma.twitterLates.count({
        where: {
            createdAt: {
                gte: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
                lte: new Date()
            }
        }
    });
    const ytb = await prisma.youtubeContent.count({
        where: {
            createdAt: {
                gte: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
                lte: new Date()
            }
        }
    });
    const ggl = await prisma.googleNews.count({
        where: {
            createdAt: {
                gte: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
                lte: new Date()
            }
        }
    });

    console.log(fb, twt, ytb, ggl)


    const data = fb + twt + ytb + ggl

    res.status(200).send(data)
}

export default dataCountYesterday 