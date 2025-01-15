import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export const GET = auth(async function GET(req) {

    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        const auth = req.auth

    const allowedRoles = ["ADMIN", "DIRECTOR", "WRITER"]
    if (!allowedRoles.includes(auth.user.role)) return NextResponse.json({ message: "You do not have the proficient role to access this route" }, { status: 401 })

    if (auth.user.role === "WRITER") {
        return await GET_OWN(req)
    }
    return await GET_ALL(req)

})
