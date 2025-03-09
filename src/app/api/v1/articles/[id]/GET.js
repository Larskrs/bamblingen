import { GetArticle, MAX_PER_PAGE } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function GET(req, params) {

    const parm = await params
    const id = parm.id   

    try {

        const data = await GetArticle(id)

        return NextResponse.json( data );
    } catch (err) {
        return NextResponse.json(
            {
                message: "Could not retrieve articles due to an error",
                error: err.message || err,
            },
            { status: 500 }
        );
    }
}