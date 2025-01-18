"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/editor/input/TextArea";
import { FileExplorer } from "@/components/common/FileExplorer";

export default function ImageComponent ({
    id, src, alt, credit, onChange=()=>{}
}) {

    const fixURL = (source) => {
        return source.replace("https://bamblingen.no", "")
    }

    const [_src, setSource] = useState(src)
    const [_preview, setPreview] = useState(src)
    const [_alt, setAlt] = useState(alt)
    const [_credit, setCredit] = useState(credit)
    
    const query = () => {
        return {
            type: "image",
            src: _src,
            alt: _alt,
            credit: _credit
        }
    }
        useEffect(() => {
            setPreview(_src)
        }, [_src])
    
        useEffect(() => {
            onChange(query())
        }, [_src, _credit, _alt])
    
        if (!_src) {
            return <></>
        }

    return (

        <>
                <FileExplorer onFileSelected={(f) => {setSource(`/api/v1/files?fileId=${f.id}`)}} >
                    <img className={styles.preview} src={_preview} alt="bildeadresse"/>
                </FileExplorer>
                    {/* <TextArea
                        placeholder="Bildeaddresse"
                        description={`Bildeadressa skal kun være fra bamblingen.no. Trykk på enter for å velge bildet`}
                        defaultValue={src}
                        onChange={(value) => { setPreview(value)}}
                        onEnter={(value) => { setSource(value) }}
                        /> */}
                    <TextArea
                        placeholder="Bildetekst"
                        description={`Alternativ bildetekst`}
                        onChange={(value) => { setAlt(value) }}
                        defaultValue={alt}
                        />
                    <TextArea
                        placeholder="Kilde"
                        description={`Kilde til bildet, hvem står bak? Hvem har copyright?`}
                        onChange={(value) => { setCredit(value) }}
                        defaultValue={credit}
                        />
        </>
    );
}
