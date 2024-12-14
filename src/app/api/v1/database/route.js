import { NextResponse } from "next/server";
import { testConnection } from "@/lib/db";
import { logger } from "logger";

export async function GET () {

    let result = null
    try {
        result = await testConnection()
        return Response.json({
            message: `Database debug finished with success`,
            data: result,
        })
    } catch (err) {
        return Response.json({
            message: `Database connection failed`,
            error: err
    })
    }
}