import { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash'
import { Keyword } from "@prisma/client";
import { DataKeyword, ResultDashboard } from "../../../models/model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

const apiDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
    let data = await prisma.keyword.findMany({
        include: {
            _count: {
                select: {
                    YoutubeContent: true,
                    FacebookLike: true,
                    GoogleNews: true,
                    TwitterLates: true
                }
            }
        },
        orderBy: {
            idx: "asc"
        }
    })

    // me sum semua score
    let hasil = data?.map((e: Keyword & DataKeyword) => {
        return {
            id: e.id,
            idx: e.idx,
            name: e.name,
            score: e._count.FacebookLike + e._count.GoogleNews + e._count.TwitterLates + e._count.FacebookLike
        }
    })

    let total = _.sumBy(hasil, (e) => e.score);

    let result2: ResultDashboard[] | undefined = hasil?.map(e => ({
        id: e.id,
        idx: e.idx,
        name: e.name,
        score: Number(((e.score / total) * 100).toFixed())
    }))

    res.status(200).json(result2)

}

export default apiDashboard