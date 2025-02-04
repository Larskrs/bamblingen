"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"

export default function SelectedView ({file}) {

    if (!file) {
        return <></>
    }

    console.log({file})
    const url = `/api/v1/files?fileId=${file.id}`

    return (
        <div className={styles.c}>
            <FileImage {...file} />

            <div className={styles.details}>
                <p><b>Navn</b>{file.name}</p>
                <div className={styles.row}>
                    <Link className={styles.download} target="_blank" download={true} href={`${url}`}>Last ned</Link>
                    <Link className={styles.link} target="_blank" href={`${url}`}>Åpne lenke</Link>
                </div>
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
            <video autoPlay controls src={url} alt="artig" width={512} height={512} />
        </div>
    }
}