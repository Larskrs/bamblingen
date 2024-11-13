import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic'

// USE ONLY WHEN COOKIES ARE ACCEPTED

export async function GET () {
    const cookieStore = await cookies();
    if (!cookieStore.has("bamblingen_tracking_id")) {
        cookieStore.set("bamblingen_tracking_id", uuidv4())
    }
    const bamblingen_tracking_id = cookieStore.get('bamblingen_tracking_id');

    return NextResponse.json({bamblingen_tracking_id: bamblingen_tracking_id})
}