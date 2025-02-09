import { auth } from "@/auth";
import { ConnectOrCreateCategoryTags, GenerateUniqueIdentifier } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { GenerateBatchID } from "@/lib/fileLib";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {

    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        const auth = req.auth

    const formData = await req.formData();
    if (!formData.has('name')) {
        return NextResponse.json({ message: "No 'name', provided" }, { status: 401 })
    }

    const batchName = formData.get('name')
    const batchId = await GenerateBatchID()

    let batch = null
    try {

        batch = await db.batch.create({
            data: {
                name: batchName,
                id: batchId,
                user: {
                    connect: {
                        id: auth.user.id
                    }
                }
            }
        })
    } catch (err) {
        return NextResponse.json({
            message: `Error while creating batch entry in database`,
            error: err.message
        }, { status: 500 })
    }

    return NextResponse.json({
            message: `Successfully created a new batch with name: "${batchName}"`,
            data: batch
        },
        { status: 200}
    )


}
)

function ErrorMessage (err) {
    return NextResponse.json(
    {
        error: err,
    },
    { status: 500 }
    )
}

export default POST