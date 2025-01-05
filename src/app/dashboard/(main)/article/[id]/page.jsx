"use server"

import styles from "./page.module.css";
import Editor from "./editor"
import { auth } from "@/auth";
import { DefaultArticle, GetArticle } from "@/lib/articleLib";
import { notFound } from "next/navigation";
import { GetUsers } from "@/lib/userLib";


export default async function NewsArticlePage ({ params }) {

    const id = (await params).id

    const session = await auth()
    if (!session) {
        return notFound()
    }
    if (id === 'new') {
        const defaultArticle = await DefaultArticle([session.user.id])
        defaultArticle.authors = await GetUsers([session.user.id])

        return (
            <Editor articleId={id} defaultArticle={defaultArticle} userId={session.user.id} />
        )
    
    }
    const defaultArticle = await GetArticle(id)

    if (!defaultArticle) {
        return notFound()
    }

    return (
        <Editor articleId={id} defaultArticle={defaultArticle} userId={session.user.id} />
    )
}