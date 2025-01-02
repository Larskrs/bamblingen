import { db } from "./db"

export async function GetUser (id) {
    if (!id) { return null; }

    const data = await db.user.findUnique({
        where: {
            id: id
        }
    })

    return data
}
export async function GetUsers (array) {
    if (!array) { return null; }
    if (!array.length) { return null; }

    const data = await db.user.findMany({
        where: {
            id: { in: array }
        }
    })

    return data
}