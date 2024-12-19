import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios from "axios";
import { notFound } from "next/navigation";

export async function generateMetadata ({ params }) {

    const parm = await params
    const id = parm.id

    const response = await axios.get(`${process.env.PUBLIC_NEXT_URL}/api/v1/articles/${id}`)
    const data = response.data

    return {
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: `Beskrivelse for artikkel`,
            creator: `${data.authors.map((a) => a.name)}`,
        },
    }
}
export default async function NewsArticlePage ({ params }) {

    const parm = await params
    const id = parm.id

    const response = await axios.get(`/api/v1/articles/${id}`)
    const data = response.data

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