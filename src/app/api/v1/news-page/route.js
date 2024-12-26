import { NextResponse } from "next/server";
import GetRequest from "./GET"
import PostRequest from "./POST"

export async function GET (req) {
    return await GetRequest(req)
}
export async function POST (req) {
    return await PostRequest(req)
}