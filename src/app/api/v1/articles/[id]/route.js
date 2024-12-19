import { NextResponse } from "next/server";
import GetRequest from "./GET"

export async function GET (req, {params}) {
    return await GetRequest(req, params)
}