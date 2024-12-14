import { NextResponse } from "next/server";


export async function GET () {
    return NextResponse.json({
        production: process.env.NODE_ENV
    })
}