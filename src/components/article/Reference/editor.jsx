"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import MarkdownFormatter from "@/components/common/MarkdownText";
import Image from "next/image";
import TextArea from "@/components/editor/input/TextArea";

export default function ReferenceEditor ({
    id="", onChange=()=>{}
}) {

    const [_id, setId] = useState(id)

    const query = () => {
        return {
            type: "reference",
            id: _id
        }
    }
    useEffect(() => {
        onChange(query())
    }, [_id])

    if (!_id) {
        return <></>
    }


    return (

        <>
                    <TextArea
                        placeholder="Artikkel"
                        description={`Bildeadressa skal kun være fra bamblingen.no. Trykk på enter for å velge bildet`}
                        defaultValue={_id}
                        onEnter={(value) => { setId(value) }}
                        />
        </>
    );
}
