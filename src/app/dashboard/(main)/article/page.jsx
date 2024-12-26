"use server"

import styles from "./page.module.css";
import Editor from "./editor"
import { auth } from "@/auth";
import { DefaultArticle } from "@/lib/articleLib";


export default async function NewsArticlePage ({ params }) {

    const session = await auth()
    const defaultArticle = await DefaultArticle(["cm51oa4540000ty98gswkaaxo"])

    return (
        <Editor defaultArticle={defaultArticle} />
    )
}