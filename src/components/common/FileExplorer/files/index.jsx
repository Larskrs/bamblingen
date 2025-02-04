"use client"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import styles from "./files.module.css"
import Image from "next/image";
import Link from "next/link";
import { GetFileFallbackIcon } from "@/lib/fileLib";
import { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Batches ({onFileSelect=()=>{}, batch="debug"}) {
    
    const [data, setData] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        async function fetchFiles() {
            try {
                const res = await fetch(`/api/v1/files/list?batch=${batch}&per_page=100&page=1`);
                const json = await res.json();
                setData(prevData => (JSON.stringify(prevData) === JSON.stringify(json) ? prevData : json));
            } catch (err) {
                console.error("Error fetching category:", err);
            }
        }
        fetchFiles();
    }, [batch]);

    if (!data) { return <p>No Data</p>}

    return (
        <div className={styles.c}>
            {data.map((f, i) =>
                <FileDisplay selected={selected == f.id} key={f.id} file={f} index={i} onSelect={onFileSelect} />
            )}
            {/* <button onClick={() => loadMore()}>Load More</button> */}
        </div>
    );
}

function FileDisplay ({file, index, onSelect, selected}) {

    const handleClick = () => {
        onSelect(file);
    };

    const url = `/api/v1/files?fileId=${file.id}`
    return (
        <div className={styles.item} href={url} onClick={handleClick}>
            <div style={{outline: `2px solid ${selected ? "white" : "transparent"}`}} className={styles.image}>
                {/* <Image alt={"file-thumbnail"} width={256} height={256} src={image} /> */}
                <ImageView key={index} file={file} />
            </div>
            <p>{file.name}</p>
        </div>
    )
}

const ImageView = memo(({file}) => {

    const size = {width: 128, height: 128}

    const url = `/api/v1/files?fileId=${file.id}`
    const fileType = file.type.split("/").shift()

    if (fileType == "video") {
        let fallbackImage = GetFileFallbackIcon("video")
        return <>
            <Image className={styles.source} alt={"file-thumbnail"} {...size} src={fallbackImage} />
            <video className={styles.source} src={`${url}#t=0.1`} {...size} />
        </>
    }

    let fallbackImage = GetFileFallbackIcon(fileType)
    let image = fallbackImage
    if (fileType == "image") {
        image = url
    }

    return <>
        <Image className={styles.source} alt={"file-thumbnail"} {...size} src={image} />
    </>

})
ImageView.displayName = "ImageView" // 👈 Scuffed ass fix.
