"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"

export default function SelectedView ({file}) {

    if (!file) {
        return <></>
    }

    console.log({file})

    return (
        <div className={styles.c}>
            <FileImage {...file} />

            <div className={styles.details}>
                <p>{file.name}</p>
            </div>
        </div>
    )
}

function FileImage ({id, type}) {
    const url = `/api/v1/files?fileId=${id}`

    if (type.includes("image")) {
        return <div className={styles.thumbnail}>
            <Image src={url} alt="artig" width={512} height={512} />
        </div>
    }
    if (type.includes("video")) {
        return <div className={styles.thumbnail}>
            <video controls src={url} alt="artig" width={512} height={512} />
        </div>
    }
}