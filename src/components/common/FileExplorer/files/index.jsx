"use client"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import styles from "./files.module.css"
import Image from "next/image";
import Link from "next/link";
import { GetFileFallbackIcon } from "@/lib/fileLib";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Batches ({onFileSelect=()=>{}, batch="debug"}) {
    
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        async function fetchFiles () {
            let res
            try {
                res = await fetch(`/api/v1/files/list?batch=${batch}&per_page=100&page=1`)
                const json = await res.json()
                console.log(json)
                if (json) {
                    setData(json)
                }
            } catch (err) {
                console.error("Error fetching category: " + err)
            }
        }
        fetchFiles()

    }, [batch])

    if (!data) { return <p>No Data</p>}

    return (
        <div className={styles.c}>
            {data.map((f, i) =>
                <FileDisplay selected={selected == f.id} key={f.id} file={f} index={i} onSelect={onFileSelect} />
            )}
            {/* <button onClick={() => loadMore()}>Load More</button> */}
        </div>
    );
    function FileDisplay ({file, index, onSelect, selected}) {

            const url = `/api/v1/files?fileId=${file.id}`
            const fileType = file.type.split("/").shift()
            let fallbackImage = GetFileFallbackIcon(fileType)
            let image = fallbackImage
            if (fileType == "image") {
                image = url
            }
            return (
                <div className={styles.item} href={url} onClick={() => {onSelect(file); setSelected(file.id)}}>
                    <div style={{outline: `2px solid ${selected ? "white" : "transparent"}`}} className={styles.image}>
                        <Image alt={"file-thumbnail"} width={256} height={256} src={image} />
                    </div>
                    <p>{file.name}</p>
                </div>
            )
    }
}
