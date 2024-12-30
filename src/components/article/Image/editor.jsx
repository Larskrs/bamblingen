"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/common/input/TextArea";

export default function ImageComponent ({
    id, src, alt, credit, onChange=()=>{}
}) {

    const fixURL = (source) => {
        return source.replace("https://bamblingen.no", "")
    }

    const [_src, setSource] = useState(src)
    const [_alt, setAlt] = useState(alt)
    const [_credit, setCredit] = useState(credit)

    useEffect(() => {
        onChange(query())
    }, [_src, _credit, _alt])

    if (!_src) {
        return <></>
    }

    const query = () => {
        return {
            type: "image",
            src: _src,
            alt: _alt,
            credit: _credit
        }
    }

    return (
        <div className={styles.c}>
            <div className={styles.holder}>
                <div className={styles.controls}>
                    {/* <span className={styles.comments}>Trykk på 'enter' eller 'send' for å lagre</span> */}
                    <TextArea defaultValue={_src} value={_src} onEnter={(value) => { setSource(value) }} />
                </div>
                <Image className={styles.img} src={_src} alt={_alt} width={500} height={500} />
            </div>
            <div>
            <span className={styles.comment}>Beskriv handlingen i bildet</span>
            <TextArea onChange={(value) => { setAlt(value) }} defaultValue={alt}></TextArea>
            <span className={styles.comment}>Hvem er det som står bak bildet?</span>
            <TextArea onChange={(value) => { setCredit(value) }} defaultValue={credit}></TextArea>
            </div>
        </div>
    );
}
