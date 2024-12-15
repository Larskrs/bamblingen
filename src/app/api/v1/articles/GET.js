import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export default async function GET(req) {
    const url = new URL(req.url); // Parse the URL to extract query parameters
    const id = url.searchParams.get("id"); // Article ID
    let authorIds = url.searchParams.get("authorIds"); // List of author IDs (comma-separated or multiple query params)
    const hasVersions = url.searchParams.get("hasVersions"); // Optional flag for filtering articles with versions

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

        // Add conditions dynamically based on query parameters
        if (id) {
            query.where.id = id; // Filter by article ID
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

        if (hasVersions === "true") {
            query.where.versions = {
                some: {}, // Only include articles with at least one version
            };
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
