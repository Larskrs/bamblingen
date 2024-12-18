"use client"

import Image from "next/image";
import styles from "./page.module.css";
import useFetch from "@/hooks/useFetch";
import Article from "@/components/frontPage/rows/grid/items/article";

export default function News () {

    const { data, error, loading } = useFetch("/api/v1/articles?showAuthors=true")

    console.log("Fetch: ", data, error, loading)
    return (
        <>
            { loading && <h1>Loading...</h1> }
            { error && <h1>{error}</h1> }

            {data && data.map((article) => {
            
                return (<div key={article.id}>
                    <h2>{article.title}</h2>
                    {article.authors.map((author) => {
                        return <p key={author.id}>{author.name}</p>
                    })}
                    {article.id}
                </div>)
            })}

            {/* {data && data.toString()} */}
        </>
    )
}