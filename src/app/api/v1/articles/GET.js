import { MAX_PER_PAGE } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function GET(req) {
    const url = new URL(req.url); // Parse the URL to extract query parameters
    const id = url.searchParams.get("id"); // Article ID
    let authorIds = url.searchParams.get("authorIds"); // List of author IDs (comma-separated or multiple query params)
    let per_page = url.searchParams.get("per_page") || 10
    let page = url.searchParams.get("page") || 1
    let showAuthors = (url.searchParams.get("showAuthors") == "true")

    try {
        // Dynamically build the query based on optional parameters
        const query = {
            include: {
                authors: showAuthors,
                versions: {
                    take: 1,
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
            where: {}, // Initialize an empty `where` object
            orderBy: {
                createdAt: "desc"
            }
        };

        // Add conditions dynamically based on query parameters
        if (id) {
            query.where.id = id; // Filter by article ID
        }
        if (per_page) {
            if (isNaN(per_page)) { return ArgumentError('The (per_page) parameter is not a valid number', 'Use a generic integer number') }
            if (per_page > MAX_PER_PAGE) {
                per_page = MAX_PER_PAGE
            }
            query.take = parseInt(per_page)
        }
        if (page) {
            if (isNaN(page)) { return ArgumentError('The (page) parameter is not a valid number', 'Use a generic integer number') }
            console.log(parseInt(page) * parseInt(per_page))
            query.skip = (parseInt(page-1) * parseInt(per_page))
        }
        if (authorIds && authorIds.length > 0) {

            authorIds = authorIds.split(",")

            query.where.authors = {
                some: {
                    id: {
                        in: authorIds, // Ensure the IDs are numbers (or keep as strings if needed)
                    },
                }
            }
        }

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


function ArgumentError (error, solution) {
    return NextResponse.json(
    {
        error, solution
    },
    { status: 500 }
    )
}