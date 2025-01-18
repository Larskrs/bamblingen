"use client"
import Link from "next/link"
import styles from "./style.module.css"

export function Modal ({onClose=()=>{}, children}) {

    return (
        <>
            <div onClick={onClose} className={styles.background}></div>
            <div className={styles.c}>
                {children}
            </div>
        </>
    )
}