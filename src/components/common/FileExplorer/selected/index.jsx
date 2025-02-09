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
                <p><b>Id</b>{file.id}</p>
                <div className={styles.row}>
                {!file.type.includes("video") && <>
                    <Link className={styles.download} target="_blank" download={true} href={`${url}`}>Last ned</Link>
                    <Link className={styles.link} target="_blank" href={`${url}`}>Åpne lenke</Link>
                </>}
                </div>
                {file.type.includes("video") &&
                    <Link className={styles.download} href={`/watch?v=${file.id}`}>Åpne videospiller</Link>
                }
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
        const posterSrc= `/api/v1/files/video/thumbnail?v=${id}`
        return <div className={styles.thumbnail}>
            <VideoPlayer poster={posterSrc} playsInline muted controls src={url} alt="artig" width={512} height={512} />
        </div>
    }
}