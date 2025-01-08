import { ConnectOrCreateCategoryTags, MAX_PER_PAGE } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function PUT(req, params) {

    const parm = await params
    const id = parm.id

    const body = await req.json()

    console.log(body)

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

    try {
        if (!id) {
            return NextResponse.json(
                { message: "Article ID is required" },
                { status: 400 }
            );
        }

        const data = await db.article.update({
            where: {
                id: id, // Match the unique article ID
            },
            data: {
                categories: {
                    set: [], // Clear all current relationships
                    connectOrCreate: ConnectOrCreateCategoryTags(body.categories), // Add or create the new categories
                },
                type: body.type,
                versions: {
                    create: {
                        title: body.title,
                        subtitle: body.subtitle,
                        components: body.components,
                        image: body.image
                    }
                }
            },
            include: {
                categories: true
            }
        });

        console.log(data)


        return NextResponse.json( data );
    } catch (err) {
        return NextResponse.json(
            {
                message: "Service Error",
                error: err.message || err,
            },
            { status: 500 }
        );
    }
}

function ErrorMessage (err) {
    return NextResponse.json(
    {
        error: err,
    },
    { status: 400 }
    )
}