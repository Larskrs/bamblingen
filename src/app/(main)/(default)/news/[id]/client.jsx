"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import { ArticleRenderer } from "@/components/article/ArticleContent";
import Link from "next/link";
import { GetType } from "@/lib/articleLib";
import Margin from "@/components/common/Margin";

export default function NewsArticlePage ({ version, article, session, hideTools=true }) {

    let components = version.components
    let image = version.image

    if (typeof components === 'string' || components instanceof String) {
        components = JSON.parse(components)
    }
    if (typeof image === 'string' || image instanceof String) {
        try {
            image = JSON.parse(image)
        } catch (err) {
            image = {src: image, credit: "", alt: ""}
        }
    }
    console.log(components)

    const type = GetType(article.type)

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
                    <h1>{version.title}</h1>
                    <p>{version.subtitle}</p>
                </header>
                <div className={styles["lead"]}>
                    <div className={styles["lead-media"]}>
                        <Image alt="lead-media" src={image?.src} width={1280} height={720} />
                        <p className={styles.alt}>{image.alt}</p>
                        <p className={styles.credit}>{image.credit}</p>
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
                        <p className={styles.type} style={{background: type.color}}>{type.name}</p>
                        
                    </div>
                </div>
                <div className={styles.m}>
                    {/* <p>Article for {await id}</p> */}
                    <div className={styles.body}>
                        <ArticleRenderer components={components} />
                    </div>
                            
                    <Margin.Block amount={2} />

                    {(session?.user?.role || !hideTools) && <nav className={styles.nav}>
                        <>
                            <Link href={`/dashboard/article/${article.id}`}>Rediger Artikkel</Link>
                        </>
                    </nav>}
                </div>

                
            </div>
        </div>
    )
}