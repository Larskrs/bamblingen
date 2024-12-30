import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';


export const GET = auth(async function GET(req) {

    try {
        if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

        const auth = req.auth

        const userId = auth.user.id

        const files = await db.file.findMany({
            where: {
                user: {
                    id: userId
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })        


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