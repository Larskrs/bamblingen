"use client"

import Image from "next/image";
import styles from "./page.module.css";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import Article from "@/components/frontPage/rows/grid/items/article";
import { formatRelativeDate } from "@/lib/timeLib";
import Link from "next/link";
import { GetType } from "@/lib/articleLib";

    const per_page = 10

    const url = (page) =>
    `/api/v1/articles?showAuthors=true&showCategories=true&per_page=${per_page}&page=${page}`;

export default function News () {

    const { data, error, loading, loadMore } = useInfiniteFetch(url)

    return (
        <div className={styles.c}>
            <h2>Obs! Ingen saker er redaksjonelle nå</h2>
            { loading && <h1>Loading...</h1> }
            { error && <h1>{error}</h1> }

            {data && data.map((article) => {

                const v = article?.versions?.[0]

                if (!v) {
                    return <></>
                }

                const type = GetType(article.type)

                const shortenText = (text, limit) => {
                    let t = text.substring(0,limit)
                    if (text.length > limit) {
                        return t + "..."
                    }
                }

                return (<Link href={`/n/${article.id}`} className={styles.article} key={article.id}>
                    {v?.image && <div className={styles.thumbnail}>
                        <Image src={v.image} width={1280} height={720} alt={`${v.title} artikkel bilde`}/>
                    </div> }
                    <div className={styles.body}>
                        <h3>{v.title}</h3>
                        <p>{shortenText(v.subtitle, 120)}</p>
                        <div className={styles.row}>
                            <p className={styles.type} style={{background: type.color}}>{type.name}</p>
                            <p className={styles.createdAt}>{formatRelativeDate(new Date(v.createdAt))}</p>
                        </div>
                    </div>
                    {/* {article.authors.map((author) => {
                        return <p key={author.id}>{author.name}</p>
                    })}
                    {article.categories.map((category) => {
                        return <p key={category.id}>{category.name}</p>
                    })}
                    {article.id} */}
                </Link>)
            })}
            <button onClick={loadMore} disabled={loading}>
                Last mer
            </button>
            {/* {data && data.toString()} */}
        </div>
    )
}