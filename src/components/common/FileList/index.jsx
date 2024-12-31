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

                const url = `/api/v1/files?fileId=${f.id}`

                return (
                    <Link style={{animationDelay: `${i*50}ms`}} className={styles.file} href={url} key={f.id}>
                        <Image alt={f.name} width={256} height={256} src={url} />
                    </Link>
                )
            })}
    </div>
}