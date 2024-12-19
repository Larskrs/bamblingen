"use server"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios from "axios";
import { notFound } from "next/navigation";
import { logger } from "logger.mjs";

export default async function NewsArticlePage ({ params }) {

    const parm = await params
    const id = parm.id

    const url = `${process.env.LOCAL_ADDRESS}/api/v1/articles/${id}`
    console.log(url)
    logger.info("URL=" + url)

    // const response = await axios.get(url)
    // const data = response.data

    // if (!data) {
    //     return notFound()
    // }

    const data = {
        title: "Test Data"
    }

    return (
        <div className={styles.c}>
            <h1>{data.title}</h1>
            <p>Article for {await id}</p>
            {/* {data && data.toString()} */}
        </div>
    )
}