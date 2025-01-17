"use client"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import styles from "./files.module.css"
import Image from "next/image";
import Link from "next/link";
import { GetFileFallbackIcon } from "@/lib/fileLib";
import { useState } from "react";
import { useRouter } from "next/router";

const url = (page) => `/api/v1/files/list?per_page=10&page=${page}`
export default function Batches ({onOpenBatch=()=>{}}) {

    const { data, error, loading } = useInfiniteFetch(url)
    const router = useRouter()

    if (loading) {
        return <h3>Laster inn...</h3>
    }
    if (error) {
        return <pre>{error}</pre>
    }
    if (!data) { return <p>No Data</p>}

    return (
        <div className={styles.c}>
            {data.map((f, i) =>
                <FileDisplay key={f.id} file={f} index={i} onSelect={(file) => {router.push(`/api/v1/files?fileId=${file.id}`)}} />
            )}
        </div>
    );
    function FileDisplay ({file, index, onSelect}) {

            const [imageFailed, setFailed] = useState(false)

            const url = `/api/v1/files?fileId=${file.id}`
            const fileType = file.type.split("/").shift()
            let fallbackImage = GetFileFallbackIcon(fileType)
            let image = fallbackImage
            if (fileType == "image") {
                image = url
            }
            return (
                <div className={styles.item} href={url} onClick={() => onSelect(file)}>
                    <div style={{animationDelay: `${index*50}ms`}} className={styles.image}>
                        {<Image onError={() => setFailed(true)} alt={"file-thumbnail"} width={256} height={256} src={imageFailed ? fallbackImage : image} />}
                    </div>
                    <p>{file.name}</p>
                </div>
            )
    }
}
