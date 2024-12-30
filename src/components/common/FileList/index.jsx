import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"

export function FileList ({files}) {

    if (!files) {
        return <>Loading...</>
    }

    console.log(files)

    return <div style={{padding: "1rem", display: "flex", flexWrap: "wrap"}}>
        {files.map((f) => {

                const url = `/api/v1/files?fileId=${f.id}`

                return <Link style={{background: "var(--white-900)", padding: "0.5rem"}} href={url} key={f.name}>
                  <Image alt={f.name} width={96*2} height={64*2} src={url} />
                  {/* <p>{f.name}</p> */}
                </Link>
            })}
    </div>
}