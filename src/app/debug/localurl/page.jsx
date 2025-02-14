"use client"

import LocalImage from "@/components/common/LocalImage";
import TextArea from "@/components/editor/input/TextArea";
import { LocalizeURL } from "@/lib/mediaLib";
import Image from "next/image";
import { useState } from "react";

export default function LocalUrlDebugPage ({}) {

    const [url, setUrl] = useState("https://bamblingen.no/api/v1/files?fileId=20250105-b217d32b83c1660f3835d7b399c2794fe93e6e34c22599d6")

    return (
        <div style={{padding: "2rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>

            <TextArea 
                defaultValue={url}
                onChange={(v) => {setUrl(v)}}
                onEnter={(v) => {setUrl(v)}}
                description="Select url to test"
            />
            
            <img alt="debug-test-image" src={LocalizeURL(url)} width={720} height={512} />
            <p>URL: {LocalizeURL(url)}</p>
            <p>NEXT_PUBLIC_URL: {process.env.NEXT_PUBLIC_URL}</p>
        </div>
    );
}