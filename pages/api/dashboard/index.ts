import { NextApiRequest, NextApiResponse } from "next";
import _ from 'lodash'
import { Keyword } from "@prisma/client";
import { DataKeyword, ResultDashboard } from "../../../models/model";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

interface DataResult {
    id: string,
    idx: number | null,
    name: string | null,
    score?: any,
    _count?: any
}

const apiDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
    const listKeyword: DataResult[] = await prisma.keyword.findMany({
        select: {
            id: true,
            name: true,
            idx: true
        }
    })

    for (let itm of listKeyword) {
        let dataNya = await prisma.googleNews.aggregate({
            _count: {
                _all: true
            },
            where: {
                keywordId: {
                    equals: itm.id
                }
            }
        })

        itm.score = dataNya._count._all
    }

    // let data = await prisma.keyword.findMany({
    //     include: {
    //         _count: {
    //             select: {
    //                 YoutubeContent: true,
    //                 FacebookLike: true,
    //                 GoogleNews: true,
    //                 TwitterLates: true
    //             }
    //         }
    //     },
    //     orderBy: {
    //         idx: "asc"
    //     }
    // })

    // // me sum semua score
    // let hasil = data?.map((e: Keyword & DataKeyword) => {
    //     return {
    //         id: e.id,
    //         idx: e.idx,
    //         name: e.name,
    //         score: e._count.FacebookLike + e._count.GoogleNews + e._count.TwitterLates + e._count.FacebookLike
    //     }
    // })

    // let total = _.sumBy(hasil, (e) => e.score);

    // let result2: ResultDashboard[] | undefined = hasil?.map(e => ({
    //     id: e.id,
    //     idx: e.idx,
    //     name: e.name,
    //     score: Number(((e.score / total) * 100).toFixed())
    // }))

    // console.log(listKeyword)
    res.status(200).json(_.sortBy(listKeyword, "score").reverse())

}

export default apiDashboard