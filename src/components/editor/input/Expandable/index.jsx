"use client"
import { useState } from "react"
import styles from "./index.module.css"
import Image from "next/image"
import classNames from "classnames"

export default function Expandable ({onToggle=()=>{}, mode="SELF", forceExpanded, title="Dette feltet kan gjøres større", background="", icon="/icons/article_content.png", children, className}, props) {

    const [_expanded, setExpanded] = useState(false)

    const expanded = (mode == "FORCE" ? forceExpanded : _expanded)

    const handleToggle = () => {
        onToggle()
        if (mode == "FORCE") { return }
        setExpanded(!expanded)
    }

    return (
        <div className={classNames(className, styles.c)} style={expanded ? { background: "var(--secondary-75)", border: "2px solid var(--secondary-100)"} : {}}>
            <div draggable={!expanded} onClick={handleToggle} className={styles.header}>
                {background && <Image className={styles.background} style={{opacity: expanded ? 0.5 : 0.25}} src={background} alt="Expandable Backdrop" width={512} height={128} />}
                {icon && <Image alt="Expandable Icon" src={icon} width={128} height={128} />}
                <div className={styles.row}>
                    <p>{title}</p>
                    <span>{expanded
                        ? "Trykk igjen for å lukke"
                        : "Trykk for å åpne"
                    }</span>
                </div>
            </div>
            { expanded && <div className={styles.content} draggable={false}>
                {children}
            </div> }
        </div>
    )
}