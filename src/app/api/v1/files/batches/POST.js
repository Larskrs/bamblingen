import { auth } from "@/auth";
import { ConnectOrCreateCategoryTags, GenerateUniqueIdentifier } from "@/lib/articleLib";
import { db } from "@/lib/db";
import { GenerateBatchID } from "@/lib/fileLib";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {

    if (!req.auth) return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
        const auth = req.auth

    
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