import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

export const db = client


export async function testConnection () {
    return await db.user.findFirst({})
}