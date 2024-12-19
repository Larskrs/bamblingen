import { MAX_PER_PAGE } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function GET(req, params) {

    const parm = await params
    const id = parm.id

    try {
        if (!id) {
            return NextResponse.json(
                { message: "Article ID is required" },
                { status: 400 }
            );
        }
        

        const connectOrCreateTags = (_tags) => _tags.map((tagName) => ({
            where: { id: tagName.toLowerCase() },
            create: {
                name: tagName,
                id: tagName.toLowerCase(),
                description: `Kategori for ${tagName}`,
            },
        }));

        const data = await db.article.update({
            where: {
                id: id, // Match the unique article ID
            },
            data: {
                categories: {
                    set: [], // Clear all current relationships
                    connectOrCreate: connectOrCreateTags(["Skogbrann"]), // Add or create the new categories
                },
            },
            include: {
                categories: true
            }
        });


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