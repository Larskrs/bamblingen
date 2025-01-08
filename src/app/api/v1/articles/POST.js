import { ConnectOrCreateCategoryTags, GenerateUniqueIdentifier } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function POST(req) {

    try {
        
            const body = await req.json()

            if (!body.title) {
                return ErrorMessage("Title argument is missing")
            }
            if (!body.subtitle) {
                return ErrorMessage("Subtitle argument is missing")
            }
            if (!body.image) {
                return ErrorMessage("Image argument is missing")
            }
            if (body.components) {
                body.components = JSON.stringify(body.components)
                console.log(body.components)
            } else {
                return ErrorMessage("Components argument is missing")
            }
            if (!body.authors) {
                return ErrorMessage("Authors argument is missing")
            }
            if (!body.type) {
                return ErrorMessage("Type argument is missing")
            }
            const authors = body.authors

            let query = {
                data: {
                    authors: {
                        connect: authors.map((a) => {return {id: a}})
                    },
                    categories: {
                        set: [], // Clear all current relationships
                        connectOrCreate: ConnectOrCreateCategoryTags(body.categories), // Add or create the new categories
                    },
                    type: body.type,
                    versions: {
                        create: [
                            {
                                components: body.components,
                                title: body.title,
                                subtitle: body.subtitle,
                                image: body.image
                            }
                        ]
                    }
                }
            }

            if (body.categories) {

                if (!body.categories.length) {
                    return ErrorMessage("Categories property is not an array or list.")
                }

                query.data.categories = {
                    connectOrCreate: ConnectOrCreateCategoryTags(body.categories)
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

function ErrorMessage (err) {
    return NextResponse.json(
    {
        error: err,
    },
    { status: 500 }
    )
}