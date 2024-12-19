import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios from "axios";
import { notFound } from "next/navigation";

export default async function NewsArticlePage ({ params }) {

    const parm = await params
    const id = parm.id

    const { data, error, loading } = await axios.get(`/api/v1/articles/${id}`)
    
    if (!data) {
        return notFound()
    }

    return (
        <div className={styles.c}>
            <h1>{data.title}</h1>
            <p>Article for {await id}</p>
            {/* {data && data.toString()} */}
        </div>
    )
}