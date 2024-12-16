import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function POST(req) {

    const body = await req.json()

    try {

        const data = await db.article.create({
            data: {
                body
            }
        })

    return Response.json(data)
    
    } catch (err) {
        return Response.json({
            error: err
        })
    }

}