"use client"

import Image from "next/image";
import styles from "./page.module.css";
import useFetch from "@/hooks/useFetch";
import Article from "@/components/frontPage/rows/grid/items/article";
import { formatRelativeDate } from "@/lib/timeLib";
import Link from "next/link";

export default function News () {

    const { data, error, loading } = useFetch("/api/v1/articles?showAuthors=true&showCategories=true")

    return (
        <div className={styles.c}>
            { loading && <h1>Loading...</h1> }
            { error && <h1>{error}</h1> }

            {data && data.map((article) => {

                const v = article?.versions?.[0]
                
                if (!v) {
                    return <></>
                }

                return (<Link href={`/n/${article.id}`} className={styles.article} key={article.id}>
                    {v?.image &&<Image src={v.image} width={1280} height={720} alt={`${v.title} artikkel bilde`}/> }
                    <div className={styles.body}>
                        <h2>{v.title}</h2>
                        <p>{v.subtitle}</p>
                        <p>Sist oppdatert {formatRelativeDate(new Date(v.createdAt))}</p>
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

            {/* {data && data.toString()} */}
        </div>
    )
}