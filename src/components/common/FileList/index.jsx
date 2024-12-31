"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"

export function FileList ({files}) {

    if (!files) {
        return <>Loading...</>
    }

    console.log(files)

    return <div className={styles.c}>
        {files.map((f, i) => {
                return (
                    <Link style={{animationDelay: `${i*50}ms`}} className={styles.file} href={`/api/v1/files?fileId=${f.id}`} key={f.id}>
                        <Image alt={f.name} width={256} height={256} src={`/api/v1/files?fileId=${f.id}`} />
                    </Link>
                )
            })}
    </div>
}