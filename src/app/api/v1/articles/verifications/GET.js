import { auth } from "@/auth"
import { db } from "@/lib/db"
import logger from "logger.mjs"
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

const MAX_PER_PAGE = 25

const QUERY = async (req) => {
    const url = new URL(req.url); // Parse the URL to extract query parameters
    const id = url.searchParams.get("id"); // Article ID
    let per_page = url.searchParams.get("per_page") || 10
    let page = url.searchParams.get("page") || 1
    let applicants = url.searchParams.get("applicants")?.split(",");
    

            const query = {
                include: {
                    applicant: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    },
                    reviewer: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    },
                    articleVersion: {
                        select: {
                            id: true,
                            title: true,
                            subtitle: true,
                            image: true,
                            components: false,
                            location: true,
                            createdAt: true,
                            article: {
                                include: {
                                    categories: true,
                                    authors: true,
                                }
                            }
                        },
                        
                    }
                },
                where: {}, // Initialize an empty `where` object
                orderBy: {
                    createdAt: "desc"
                }
            };

            if (applicants && applicants?.length > 0) {
                query.where = {
                    applicantId: { in: applicants }
                }
            }

        
            return query
} 

const GET_OWN = async (req) => {

    try {
        const q = await QUERY(req)
        q.where = { applicantId: { in: [req.auth.user.id]}}
        const data = await db.articleVerification.findMany(await QUERY(req))   
        return NextResponse.json( data , { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error occured during data fetch: " + err}, { status: 500 })
    }
}
const GET_ALL = async (req) => {

    try {
        const data = await db.articleVerification.findMany(await QUERY(req))
        data.map((v, i) => {
            const _ = v
            try {
                _.articleVersion.image = JSON.parse(v.articleVersion.image)
            } catch {
                _.articleVersion.image = {src: _.articleVersion.image, credit: "", alt: "", type: "image"}
            }
            return _
        })
        return NextResponse.json( data , { status: 200 })
    } catch (err) {
        logger.error({message: err.message})
        return NextResponse.json({ message: "Error occured during data fetch: " + err}, { status: 500 })
    }
}

export default GET