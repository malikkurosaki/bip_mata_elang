import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";
import _ from 'lodash'

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
        }
    })

    // me sum semua score
    let hasil = data.map((e: any) => {
        return {
            id: e.id,
            idx: e.idx,
            name: e.name,
            score: e._count.FacebookLike + e._count.GoogleNews + e._count.TwitterLates + e._count.FacebookLike
        }
    })

    let total = _.sumBy(hasil, (e) => e.score);

    let result2 = hasil.map(e => ({
        id: e.id,
        idx: e.idx,
        name: e.name,
        score: Number(((e.score / total) * 100).toFixed())
    }))

    res.status(200).json(result2)

}

export default apiDashboard