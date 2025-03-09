import { NextResponse } from "next/server";
import GetRequest from "./GET"
import PutRequest from "./PUT"

export async function GET (req, {params}) {
    return await GetRequest(req, params)
}

export async function PUT (req, {params}) {
    return await PutRequest(req, await params)
}