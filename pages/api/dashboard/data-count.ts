import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../util/prisma";

const dataCount = async (req: NextApiRequest, res: NextApiResponse) => {
    const fb = await prisma.facebookLike.count()
    const twt = await prisma.twitterLates.count();
    const ytb = await prisma.youtubeContent.count();
    const ggl = await prisma.googleNews.count();

    const data = fb + twt + ytb + ggl

    res.status(200).send(data)
}

export default dataCount