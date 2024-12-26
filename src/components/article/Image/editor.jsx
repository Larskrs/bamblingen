"use client"
import styles from "./style.module.css"
import React, { useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";

export default function TextComponent({
    id, src, alt, credit
}) {

    return (
        <div className={styles.c}>
            <Image className={styles.img} src={src} alt={alt} width={500} height={500} />
            <div>
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
            </div>
        </div>
    );
}
