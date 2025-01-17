"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import { ArticleRenderer } from "@/components/article/ArticleContent";
import Link from "next/link";
import { GetType } from "@/lib/articleLib";

export default function NewsArticlePage ({ version, article, session, hideTools=true }) {

    let components = version.components

    if (typeof components === 'string' || components instanceof String) {
        components = JSON.parse(components)
    }
    console.log(components)

    const type = GetType(article.type)

    return (
        <div className={styles.c}>
            <div className={styles.article}>
            {session?.user?.role || !hideTools && <nav className={styles.nav}>
                <>
                    <Link href={`/dashboard/article/${article.id}`}>Rediger Artikkel</Link>
                </>
            </nav>}
            <div className={styles.context} style={{borderImage: `linear-gradient(to right, ${type.color}, transparent 90%) 1`}}>
                <p className={styles.type} style={{background: type.color}}>{type.name}</p>
                {article.categories.map((tag) => {
                    return (
                        <p key={tag.id}>{tag.name}</p>
                    )
                })}
            </div>
                <header className={styles.header}>
                    <h1>{version.title}</h1>
                    <p>{version.subtitle}</p>
                </header>
                <div className={styles["lead"]}>
                    <div className={styles["lead-media"]}>
                        <Image alt="lead-media" src={version.image} width={1280} height={720} />
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
                        <p className={styles.date}>Sist oppdatert {formatRelativeDate(new Date(version.createdAt))}</p>
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