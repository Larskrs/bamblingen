"use client"
import Link from "next/link"
import styles from "./style.module.css"

export function Modal ({children}) {

    return (
        <div className={styles.c}>
            {children}
        </div>
    )
}