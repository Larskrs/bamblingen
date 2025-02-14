"use client"

import Image from "next/image";
import styles from "./style.module.css"
import classNames from "classnames";
import LocalImage from "@/components/common/LocalImage";
import Link from "next/link";

export default function NavigationDropDown ({
    expanded=false
}) {

    return (
        <div 
            className={classNames(
                styles.c, 
                (expanded && styles.expanded)
            )}
            >
            

            <div className={styles.content}>
                <p></p>
                <div className={styles.row}>
                    <Card 
                        image={"https://bamblingen.no/api/v1/files?fileId=20250102-58b6a5928a6191a43d614bd9f34ab3a4727110433a57b3af"}
                        title={""}
                    />
                    <Card 
                        image={"https://bamblingen.no/api/v1/files?fileId=20250105-b217d32b83c1660f3835d7b399c2794fe93e6e34c22599d6"}
                        title={""}
                    />
                    <div className={styles.links}>
                        <Link href={"/"} >
                            Forside
                        </Link>
                        <Link href={"/radio"} >
                            Radio
                        </Link>
                        <Link href={"/n"} >
                            Nytt
                        </Link>

                        <div className={styles.space}></div>

                        <Link href={"/ethics"} >
                            Etiske Retningslinjer
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
    
    function Card ({
        image, title, link="/"
    }) {
        return (
            <Link href={link} className={styles.card}>
                <LocalImage alt={"card image"} src={image} width={720} height={512} />
                {title && <p>{title}</p>}
            </Link>
        )
    }
}

