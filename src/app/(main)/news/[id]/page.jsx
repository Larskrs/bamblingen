"use server"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios, { AxiosRequestConfig } from 'axios';
import { notFound } from "next/navigation";
import { logger } from "logger.mjs";
import { GetArticle } from "@/lib/articleLib";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleImage from "@/components/article/Image"

export default async function NewsArticlePage ({ params }) {

    const parm = await params
    const id = parm.id

    const article = await GetArticle(id)

    if (!article) {
        return notFound()
    }

    const v = article?.versions?.[0]
    const components = JSON.parse(v.components)

    return (
        <div className={styles.c}>
            <div className={styles.article}>
            <div className={styles.context}>
                {article.categories.map((tag) => {
                    return (
                        <p key={tag.id}>{tag.name}</p>
                    )
                })}
            </div>
                <header className={styles.header}>
                    <h1>{v.title}</h1>
                    <p>{v.subtitle}</p>
                </header>
                <div className={styles["lead"]}>
                    <div className={styles["lead-media"]}>
                        <Image alt="lead-media" src={v.image} width={1280} height={720} />
                    </div>
                    <div className={styles.sidebar}>
                        <div className={styles.authors}>
                            {article.authors.map((author) => {
                                return (
                                    <div key={author.id} className={styles.author}>
                                        {article.authors.length < 3 && <Image alt={`${author.name}'s image`} src={author.image} height={128} width={128}/>}
                                        <div className={styles.body}>
                                            <p>{author.name}</p>
                                            <p>{author.title || "Journalist"}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <p className={styles.date}>Sist oppdatert {formatRelativeDate(new Date(article.createdAt))}</p>
                    </div>
                </div>
                <div className={styles.m}>
                    {/* <p>Article for {await id}</p> */}
                    <div className={styles.body}>
                        <ArticleContent components={components} />
                    </div>
                </div>
            </div>
        </div>
    )
}