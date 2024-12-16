import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function POST(req) {

    const body = await req.json()

    const data = await db.article.create({
        data: {
            title: body.title,
            authors: {
                connect: {
                    id: body.authors
                }
            }
        }
    })

    return Response.json(data)

}