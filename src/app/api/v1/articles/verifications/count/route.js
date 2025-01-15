import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { query } from "winston"

export const GET = auth(async function GET(req) {

    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        const auth = req.auth

    const allowedRoles = ["ADMIN", "DIRECTOR"]
    if (!allowedRoles.includes(auth.user.role)) return NextResponse.json({ message: "You do not have the proficient role to access this route" }, { status: 401 })

    try {
        const data = await db.articleVerification.count(await QUERY(req))
        return NextResponse.json(data, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: `Unknown error while counting verifications: ${err.message}` }, { status: 500 })
    }

})

const QUERY = async (req) => {
    const url = new URL(req.url); // Parse the URL to extract query parameters
    const status = url.searchParams.get("status"); // Article ID

            const query = {
                where: {}, // Initialize an empty `where` object
            };

            if (status) {
                const allowedVerificationStatuses = ["PENDING", "PROCESSING", "DENIED", "ACCEPTED", "POSTPONED"]
                if (allowedVerificationStatuses.includes(status)) {
                    query.where = { status: status }
                }
            }

            console.log(query)

            return query
}