import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export const dynamic = 'force-dynamic' 

export async function GET () {
    db.article.findMany({
        select: {
            authors: true,
            id: true,
        }
    })
}