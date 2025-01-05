"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"
import { useRouter } from 'next/navigation'

export function FileList ({files}) {

    const router = useRouter()

    if (!files) {
        return <>Loading...</>
    }

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
}