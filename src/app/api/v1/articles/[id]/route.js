import { NextResponse } from "next/server";
import GetRequest from "./GET"

export async function GET (req) {
    return await GetRequest(req)
}