"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"
import VideoPlayer from "../../VideoPlayer"

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
    
    if (type.includes("image")) {
        const url = `/api/v1/files?fileId=${id}`
        return <div className={styles.thumbnail}>
            <Image src={url} alt="artig" width={512} height={512} />
        </div>
    }

    if (type.includes("video")) {
        const url = `/api/v1/files/video?v=${id}`
        return <div className={styles.thumbnail}>
            <VideoPlayer autoPlay controls src={url} alt="artig" width={512} height={512} />
        </div>
    }
}