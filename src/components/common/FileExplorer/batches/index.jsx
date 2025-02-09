"use client"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import styles from "./batches.module.css"
import Image from "next/image";
import { useEffect, useState } from "react";
import CreateBatch from "@/components/files/CreateBatch";
import BatchImage from "@/components/files/BatchImage";

export default function Batches ({onOpenBatch=()=>{}}) {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchBatches () {
            let res
            try {
                res = await fetch(`/api/v1/files/batches?per_page=100&page=${1}`)
                const json = await res.json()
                console.log(json)
                if (json) {
                    setData(json)
                }
            } catch (err) {
                console.error("Error fetching category: " + err)
            }
        }
        fetchBatches()

    }, [])

    if (!data) { return <p>No Data</p>}

    return (
        <div className={styles.c}>
            {data.map((b, i) => {
                return (
                    <div key={b.id} className={styles.item} onClick={() => onOpenBatch(b.id)}>
                        <div style={{animationDelay: `${i*50}ms`}} className={styles.image}>
                            <BatchImage size={256} id={b.id} name={b.name} files={b._count.files}/>
                        </div>
                    </div>
                )
            })}
        </div>
    );

}