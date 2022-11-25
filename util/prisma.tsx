import { Prisma, PrismaClient } from "@prisma/client"

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

let prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient()
} else {

    if (!global.prisma) {
        global.prisma = new PrismaClient()
    }

    prisma = global.prisma
}

export default prisma