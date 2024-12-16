import { MAX_PER_PAGE } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function GET(req) {

    try {
        // Dynamically build the query based on optional parameters
        const query = {
            include: {
                authors: true,
                versions: {
                    take: 1,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
            where: {}, // Initialize an empty `where` object
        };

        // Fetch data from the database with the constructed query
        const data = await db.article.findMany(query);

        return NextResponse.json({ data });
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