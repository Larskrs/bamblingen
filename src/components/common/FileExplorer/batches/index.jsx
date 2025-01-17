"use client"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import styles from "./batches.module.css"
import Image from "next/image";

const url = (page) => `/api/v1/files/batches?per_page=100&page=${page}`
export default function Batches ({onOpenBatch=()=>{}}) {

    const { data, error, loading, loadMore } = useInfiniteFetch(url)

    if (loading) {
        return <h3>Laster inn...</h3>
    }
    if (error) {
        return <pre>{error}</pre>
    }
    if (!data) { return <p>No Data</p>}

    return (
        <div className={styles.c}>
            {data.map((b, i) => {
                return (
                    <div key={b.id} className={styles.item} onClick={() => onOpenBatch(b.id)}>
                        <div style={{animationDelay: `${i*50}ms`}} className={styles.image}>
                            <Image alt={b.name} width={512} height={512} src={`/api/image/batch?b=${b.id}`} />
                        </div>
                        <p>{b.name}</p>
                    </div>
                )
            })}
        </div>
    );
}