"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import TextArea from "@/components/editor/input/TextArea";
import { FileExplorer } from "@/components/common/FileExplorer";
import VideoPlayer from "@/components/common/VideoPlayer";

export default function ImageComponent ({
    id, src, alt, credit, poster, onChange=()=>{}
}) {

    const [_poster, setPoster] = useState(poster)
    const [_src, setSource] = useState(src)
    const [_alt, setAlt] = useState(alt)
    const [_credit, setCredit] = useState(credit)
    
    const query = () => {
        return {
            type: "video",
            src: _src,
            alt: _alt,
            credit: _credit,
            poster: _poster,
        }
    }
    
        useEffect(() => {
            onChange(query())
        }, [_src, _credit, _alt, _poster])

    return (

        <>
                <FileExplorer onFileSelected={(f) => {setSource(`/api/v1/files/video?v=${f.id}`); setPoster(`/api/v1/files/video/thumbnail?v=${f.id}`)}} >
                    <VideoPlayer poster={_poster} className={styles.video} loop autoPlay playsInline muted src={_src} alt="bildeadresse"/>
                </FileExplorer>
                    <TextArea
                        placeholder="Bildetekst"
                        description={`Alternativ tekst eller og beskrivelse på handling i bildet`}
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
