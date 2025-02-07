import { db } from "@/lib/db"
import { notFound } from "next/navigation";
import styles from "./page.module.css"
import NotFoundBatch from "./_NotFoundBatch/page"

export default async function Batches ({
    params
}) {

    const batchId = (await params).id

    const batch = await db.batch.findUnique({
        where: {
            id: batchId,
        }
    })

    if (!batch) {
        return <NotFoundBatch />
    }

    return (
        <div className={styles.c}>
            Enter
        </div>
    );
}





export async function generateStaticParams() {
    const batches = await db.batch.findMany({
        select: {
            id: true
        }
    })

    if (!batches) {
        return []
    }

    return batches.map((batch) => ({
        id: batch.id,
    }))
}