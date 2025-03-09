"use server"

import styles from "./page.module.css";
import { auth } from "@/auth";
import { DefaultArticle } from "@/lib/articleLib";
import { notFound } from "next/navigation";
import Table from "./table"

export default async function NewsArticlePage ({ params }) {

    const session = await auth()
    if (!session) {
        return notFound()
    }
    const defaultArticle = await DefaultArticle([session.user.id])

    return (
        <Table />
        // <Editor defaultArticle={defaultArticle} userId={session.user.id} />
    )
}