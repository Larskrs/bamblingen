"use server"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios, { AxiosRequestConfig } from 'axios';
import { notFound } from "next/navigation";
import { logger } from "logger.mjs";

export default async function NewsArticlePage ({ params }) {

    const parm = await params
    const id = parm.id
	const host = "http://localhost:3000"
    const url = `${host}/api/v1/articles/${id}`

    const axioss = axios.create({
        baseURL: `http://localhost:3000`,
        headers: {
            'Accept': 'application/json',
        },
    });

    console.log(url)

    let data;
    try {
        const response = await axioss(url); // Optional: Add revalidation for caching
        if (!response.statusText == "ok") {
            console.error("Failed to fetch article:", response.status, response.statusText);
            // return notFound();
        }
        data = await response.data
        console.log(data)
    } catch (error) {
        console.error("Error fetching article:", error);
        // return notFound();
    }

    return (
        <div className={styles.c}>
            <h1>{data.title}</h1>
            <p>Article for {await id}</p>
			<p>{url}</p>
        </div>
    )
}