import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();


const dataCountToday = async (req: NextApiRequest, res: NextApiResponse) => {
    const fb = await prisma.facebookLike.count({
        where: {
            createdAt: {
                gt: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
            }
        }
    })
    const twt = await prisma.twitterLates.count({
        where: {
            createdAt: {
                gt: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
            }
        }
    });
    const ytb = await prisma.youtubeContent.count({
        where: {
            createdAt: {
                gt: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
            }
        }
    });
    const ggl = await prisma.googleNews.count({
        where: {
            createdAt: {
                gt: new Date(Date.parse(moment().subtract(1, "d").format("YYYY-MM-DD"))),
            }
        }
    });

    console.log(fb, twt, ytb, ggl)


    const data = fb + twt + ytb + ggl

    res.status(200).send(data)
}

export default dataCountToday 