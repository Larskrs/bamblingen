"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/editor/input/TextArea";

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

        <>
                    <TextArea placeholder="Bildeaddresse" description={`Bildeadressa skal kun være fra bamblingen.no \ntrykk på enter for å velge bildet.`} defaultValue={src}  onEnter={(value) => { setSource(value) }} />
                    <TextArea onChange={(value) => { setAlt(value) }} defaultValue={alt}></TextArea>
                    <TextArea onChange={(value) => { setCredit(value) }} defaultValue={credit}></TextArea>
        </>
    );
}
