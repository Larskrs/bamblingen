"use client"

import Image from "next/image";
import styles from "./page.module.css";
import useFetch from "@/hooks/useFetch";
import Article from "@/components/frontPage/rows/grid/items/article";
import { formatRelativeDate } from "@/lib/timeLib";
import Link from "next/link";

export default function News () {

    const { data, error, loading } = useFetch("/api/v1/articles?showAuthors=true&showCategories=true")

    console.log("Fetch: ", data, error, loading)
    return (
        <div className={styles.c}>
            { loading && <h1>Loading...</h1> }
            { error && <h1>{error}</h1> }

            {data && data.map((article) => {

                return (<Link href={`/n/${article.id}`} className={styles.article} key={article.id}>
                    <h2>{article.title}</h2>
                    <p>Sist oppdatert {formatRelativeDate(new Date(article.createdAt))}</p>
                    {article.authors.map((author) => {
                        return <p key={author.id}>{author.name}</p>
                    })}
                    {article.categories.map((category) => {
                        return <p key={category.id}>{category.name}</p>
                    })}
                    {article.id}
                </Link>)
            })}

            {/* {data && data.toString()} */}
        </div>
    )
}