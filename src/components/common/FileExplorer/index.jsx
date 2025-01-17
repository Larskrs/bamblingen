"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import Batches from "./batches"
import Files from "./files"

export function FileExplorer () {

    const router = useRouter()

    const [batch, setBatch] = useState(null)

    return (<div className={styles.c}>
        <ListRenderer />
    </div>)

    return <div className={styles.c}>
        {files.map((f, i) => {
                const url = `/api/v1/files?fileId=${f.id}`
                const fileType = f.type.split("/").shift()
                let image = `/icons/icon_file_${fileType}.svg`

                if (fileType == "image") {
                    image = url
                }

                return (
                    <div style={{animationDelay: `${i*50}ms`}} className={styles.file} onClick={() => {router.push(url)}} key={f.id}>
                        <Image alt={f.name} width={256} height={256} src={image} />
                    </div>
                )
            })}
    </div>


    function ListRenderer ({}) {

        if (!batch) {
            return <Batches onOpenBatch={(id) => setBatch(id)}/>
        }

        return <Files />
    }
}