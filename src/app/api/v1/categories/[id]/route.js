import { NextResponse } from "next/server";
import { db } from "@/lib/db"

export async function GET (req, {params}) {

    const parm = await params
    const id = parm.id

    try {
        const category = await db.category.findUnique({
            where: {
                id: id
            }
        })
        return NextResponse.json(category, { status: 200 })
    } catch (err) {
        return NextResponse.json({message: err.message}, {status: 500})
    }
        

}