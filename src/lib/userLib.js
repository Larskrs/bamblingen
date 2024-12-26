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