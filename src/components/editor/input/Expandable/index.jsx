"use client"
import { useState } from "react"
import styles from "./index.module.css"
import Image from "next/image"

export default function Expandable ({title="Dette feltet kan gjøres større", icon="/icons/article_content.png", children}) {

    const [expanded, setExpanded] = useState(false)

    return (
        <div className={styles.c} style={expanded ? { background: "var(--secondary-75)"} : {}}>
            <div onClick={() => {setExpanded(!expanded)}} className={styles.header}>
                {icon && <Image alt="Expandable Icon" src={icon} width={128} height={128} />}
                <div className={styles.row}>
                    <p>{title}</p>
                    <span>{expanded
                        ? "Trykk igjen for å lukke"
                        : "Trykk for å åpne"
                    }</span>
                </div>
            </div>
            { expanded && <div className={styles.content}>
                 {children}
            </div> }
        </div>
    )
}