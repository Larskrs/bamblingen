"use client"
import styles from "./index.module.css"

export default function SaveButton ({onClick, disabled, progress, children}) {

    return (
        <div  onClick={(e) => {if (!disabled) onClick(e)}} className={styles.c}>
            <div className={styles.progress} style={{width: `${progress}%`}}></div>
            <p>{children}</p>
        </div>
    )
}