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
                return (
                    <div style={{animationDelay: `${i*50}ms`}} className={styles.file} onClick={() => {router.push(`/api/v1/files?fileId=${f.id}`)}} key={f.id}>
                        <Image alt={f.name} width={256} height={256} src={`/api/v1/files?fileId=${f.id}`} />
                    </div>
                )
            })}
    </div>
}