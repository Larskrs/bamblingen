"use server"

import styles from "./page.module.css";
import Editor from "./editor"
import { auth } from "@/auth";
import { DefaultArticle } from "@/lib/articleLib";
import { notFound } from "next/navigation";


export default async function NewsArticlePage ({ params }) {

    const session = await auth()
    if (!session) {
        return notFound()
    }
    const defaultArticle = await DefaultArticle([session.user.id])

    return (
        <Editor defaultArticle={defaultArticle} />
    )
}