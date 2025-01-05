"use client"
import Image from "next/image";
import styles from "./style.module.css"

export default function GridIconSelector ({
    items=null,
    fallBackIcon="/icons/icon_file_image.svg",
    onChange=()=>{},
}) {

    return (
        <div className={styles.c}>
            {Object.keys(items).map((key, i) => {
                const item = items[key]
                return <div key={key} onClick={() => onChange(key)} className={styles.item}>
                        <Image src={item.icon || fallBackIcon} width={64} height={64} alt={`icon-${key}`}></Image>
                    </div>
            })}
        </div>
    );
}