import { GenerateUniqueIdentifier } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function POST(req) {

    try {

            const body = await req.json()
            if (!body.title) {
                return MissingArgumentError("Title argument is missing")
            }
            if (!body.authors) {
                return MissingArgumentError("Authors argument is missing")
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
            const id = await GenerateUniqueIdentifier(new Date());
            // query.data.slugId = shortId
            query.data.id = id

            console.log(query)

            const data = await db.article.create(query)
            return Response.json(data)
        } catch (err) {
            return NextResponse.json(
                err.message,
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