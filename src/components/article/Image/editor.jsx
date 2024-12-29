"use client"
import styles from "./style.module.css"
import React, { useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/common/input/TextArea";

export default function TextComponent({
    id, src, alt, credit
}) {

    return (
        <div className={styles.c}>
            <Image className={styles.img} src={src} alt={alt} width={500} height={500} />
            <div>
            <p className={styles.alt}><TextArea defaultValue={alt}></TextArea></p>
            <p className={styles.credit}><TextArea defaultValue={credit}></TextArea></p>
            </div>
        </div>
    );
}
