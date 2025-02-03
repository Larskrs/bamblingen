"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"

export default function SelectedView ({files=[]}) {

    const f = files?.[0]

    return (
        <div className={styles.c}>
            <FileImage id={f} />
        </div>
    )
}

function FileImage ({id}) {
    const url = `/api/v1/files?fileId=${id}`

    return <div className={styles.thumbnail}>
            <Image src={url} alt="artig" width={512} height={512} />
        </div>
}