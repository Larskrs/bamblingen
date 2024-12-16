import { GenerateUniqueIdentifier } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function POST(req) {

    const body = await req.json()
    if (!body.title) {
        return MissingArgumentError("Title argument is missing")
    }
    if (!body.authors) {
        return MissingArgumentError("Author argument is missing")
    }
    const authors = body.authors

    let query = {
        data: {
            title: body.title,
            authors: {
                connect: authors.map((a) => {return {id: a}})
            }
        }
    }
    const shortId = await GenerateUniqueIdentifier(new Date());
    query.data.slugId = shortId
    query.data.id = shortId

    console.log(query)

        try {
            const data = await db.article.create(query)
            return Response.json(data)
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

function MissingArgumentError (err) {
    return NextResponse.json(
    {
        error: err,
    },
    { status: 500 }
    )
}