"use client"
import Image from "next/image";
import styles from "./visualizer.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import ArticleContent, { ArticleRenderer } from "@/components/article/ArticleContent";

export default function NewsArticlePage ({ query=null }) {

    if (!query) {
        return <p>Finner ikke artikkelinformasjon for å visualisere endringer</p>
    }

    const id = query.id

    const components = query.components

    return (
        <div className={styles.c}>
            <div className={styles.article}>
            <div className={styles.context}>
                {query.categories.map((tag) => {
                    return (
                        <p key={tag.id || tag.toString()}>{tag.name}</p>
                    )
                })}
            </div>
                <header className={styles.header}>
                    <h1>{query.title}</h1>
                    <p>{query.subtitle}</p>
                </header>
                <div className={styles["lead"]}>
                    <div className={styles["lead-media"]}>
                        <Image alt="lead-media" src={query.image} width={1280} height={720} />
                    </div>
                    <div className={styles.sidebar}>
                        <div className={styles.authors}>
                            {query.authors.map((author) => {
                                return (
                                    <div key={author.id} className={styles.author}>
                                        {query.authors.length < 3 && <Image alt={`${author.name}'s image`} src={author.image || "/icons/icon_file_image.svg"} height={128} width={128}/>}
                                        <div className={styles.body}>
                                            <p>{author.name}</p>
                                            <p>{author.title || "Journalist"}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <p className={styles.date}>Sist oppdatert {formatRelativeDate(new Date())}</p>
                    </div>
                </div>
                <div className={styles.m}>
                    {/* <p>Article for {await id}</p> */}
                    <div className={styles.body}>
                        <ArticleRenderer components={components} />
                    </div>
                </div>
            </div>
        </div>
    )
}