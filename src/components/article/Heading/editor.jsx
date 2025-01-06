"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/editor/input/TextArea";

export default function ImageComponent ({
    text, level, onChange=()=>{}
}) {

    const [txt, setTxt] = useState(text)
    const [lvl, setLvl] = useState(level)

    const possibleLevels = [1,2,3,4]

    const query = () => {
        return {
            type: "heading",
            text: txt,
            level: lvl,
        }
    }
        useEffect(() => {
            onChange(query())
        }, [txt, lvl])

    return (

        <>
                    <div className={styles.levels}>{
                        possibleLevels.map((l) => {
                            return <button key={l} onClick={() => {setLvl(l)}} className={l == lvl && styles.selected}>h{l}</button>
                        })
                    }
                    </div>
                    <TextArea
                        placeholder="Overskrift"
                        description={`Hva skal det stå i overskriften din?`}
                        onChange={(value) => { setTxt(value) }}
                        defaultValue={text}
                        />
        </>
    );
}
