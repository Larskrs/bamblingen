"use client"
import styles from "./page.module.css"

export default function TextHighlight ({itemClass, containerClass, text, center}) {
    return (
            <div className={`${styles.c} ${containerClass} ${center && styles.center}`}>
                {text.split(" ").map((t, i) => (<p className={itemClass} key={t+i}>{t}</p>))}
            </div>
    )
}