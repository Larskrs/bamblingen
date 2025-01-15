import { auth } from "@/auth"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

const QUERY = async (req, userId) => {

    const json = await req.json()

    const query = {
        data: {
            applicantId: userId,
            articleVersionId: json.id  
        },
        include: {
            articleVersion: true,
        }
    };
        
    return query
} 

export const POST = auth(async function POST(req) {
    
    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        const auth = req.auth
    
    const allowedRoles = ["ADMIN", "DIRECTOR", "WRITER"]
    if (!allowedRoles.includes(auth.user.role)) return NextResponse.json({ message: "You do not have the proficient role to access this route" }, { status: 401 })

    try {
        const userId = auth.user.id
        const data = await db.articleVerification.create(await QUERY(req, userId))
        console.log(data)
        return NextResponse.json({ message: "All Verifications list retrieved", data }, { status: 200 })    
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error occured during data fetch: " + err}, { status: 500 })
    }
    
})

export default POST