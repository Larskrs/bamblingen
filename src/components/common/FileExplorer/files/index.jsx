"use client"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import styles from "./files.module.css"
import Image from "next/image";
import Link from "next/link";

const url = (page) => `/api/v1/files/list?per_page=10&page=${page}`
export default function Batches ({onOpenBatch=()=>{}}) {

    const { data, error, loading } = useInfiniteFetch(url)

    if (loading) {
        return <h3>Laster inn...</h3>
    }
    if (error) {
        return <pre>{error}</pre>
    }
    if (!data) { return <p>No Data</p>}

    return (
        <div className={styles.c}>
            {data.map((f, i) => {
                const url = `/api/v1/files?fileId=${f.id}`
                const fileType = f.type.split("/").shift()
                let image = `/icons/icon_file_${fileType}.svg`

                if (fileType == "image") {
                    image = url
                }

                return (
                    <Link className={styles.item} href={url} key={f.id}>
                        <div style={{animationDelay: `${i*50}ms`}} className={styles.image}>
                            <Image alt={f.name} width={256} height={256} src={image} />
                        </div>
                        <p>{f.name}</p>
                    </Link>
                )
            })}
        </div>
    );
}