import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';


export const GET = auth(async function GET(req) {

    try {
        if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        const auth = req.auth


        

        const files = await db.file.findMany(QUERY(req))

        return NextResponse.json(
            files,
        )
    } catch (err) {
        return NextResponse.json({
            message: "Error: " + err
        }, {
            status: 505
        })
    }
}
)

const QUERY = (req) => {
    const url = new URL(req.url); // Parse the URL to extract query parameters
    const batchId = url.searchParams.get("batch"); // Article ID

    const q = {
        where: { },
        orderBy: {
            createdAt: "desc"
        }
    }

    if (batchId) {
        q.where.batchId = batchId
    }
    return q
}