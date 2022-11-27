
const prisma = new (require('@prisma/client').PrismaClient)()

async function main() {
    const data = await prisma.$queryRaw`
    select WEEKDAY(curdate()) as WEEK
    `

    console.log(data)
}

main()
