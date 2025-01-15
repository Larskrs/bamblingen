"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/editor/input/TextArea";

export default function ImageComponent ({
    text, author, onChange=()=>{}
}) {

    const [txt, setTxt] = useState(text)
    const [_author, setAuthor] = useState(author)


    const query = () => {
        return {
            type: "quote",
            text: txt,
            author: _author,
        }
    }
        useEffect(() => {
            onChange(query())
        }, [txt, _author])

    return (

        <>
                    <TextArea
                        placeholder="Sitat"
                        description={`Hva er sitatet?`}
                        onChange={(value) => { setTxt(value) }}
                        defaultValue={text}
                        />
                    <TextArea
                        placeholder="Person"
                        description={`Hvem er sitatet fra?`}
                        onChange={(value) => { setAuthor(value) }}
                        defaultValue={author}
                        />

        </>
    );
}
