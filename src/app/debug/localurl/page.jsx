"use client"

import LocalImage from "@/components/common/LocalImage";
import { LocalizeURL } from "@/lib/mediaLib";
import Image from "next/image";
import { useState } from "react";

export default function page ({}) {

    const [url, setUrl] = useState("https://bamblingen.no/api/v1/files?fileId=20250105-b217d32b83c1660f3835d7b399c2794fe93e6e34c22599d6")

    return (
        <div style={{padding: "2rem"}}>
            <Image src={LocalizeURL(url)} width={720} height={512} />
            <p>{LocalizeURL(url)}</p>
        </div>
    );
}