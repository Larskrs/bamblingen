"use server"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios, { AxiosRequestConfig } from 'axios';
import { notFound } from "next/navigation";
import { logger } from "logger.mjs";
import { GetArticle } from "@/lib/articleLib";

export default async function NewsArticlePage ({ params }) {

    const parm = await params
    const id = parm.id
	
    const article = await GetArticle(id)

    return (
        <div className={styles.c}>
            <h1>{article.title}</h1>
            <p>Sist oppdatert {formatRelativeDate(new Date(article.createdAt))}</p>
            <p>Article for {await id}</p>
            <p>{article.authors.map((author) => {
                return <span key={author.id}>{author.name}</span>
            })}</p>
            <p>{article.categories.map((category) => {
                return <span key={category.id}>{category.name}</span>
            })}</p>
        </div>
    )
}