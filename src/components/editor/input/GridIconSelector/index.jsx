"use client"
import Image from "next/image";
import styles from "./style.module.css"
import { useState } from "react";

export default function GridIconSelector ({
    items=null,
    fallBackIcon="/icons/icon_file_image.svg",
    onChange=()=>{},
}) {

    const [hover, setHover] = useState(null)

    return (
        <div className={styles.c}>
            <div className={styles.grid}>
            {Object.keys(items).map((key, i) => {
                const item = items[key]
                return <div onMouseOver={(e) => {setHover(item?.description)}} key={key} onClick={() => onChange(key)} className={styles.item}>
                        <Image src={item.icon || fallBackIcon} width={64} height={64} alt={`icon-${key}`}></Image>
                    </div>
            })}
            </div>
            <div className={styles.details}>{hover}</div>
        </div>
    );
}