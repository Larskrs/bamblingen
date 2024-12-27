"use client"
import SimpleFileDropper from "@/components/common/input/SimpleFileDropper";
import Image from "next/image";

export default function Batches () {
    return (
        <div style={{width: "100%", height: "100%", position: "relative", objectFit: "cover", overflow: "hidden"}}>
            {/* <Image style={{objectFit: "cover", scale: "1.1"}} alt="image" src={"http://aktuelt.tv/api/files?fileId=675c5320d222fb15c503bc6c"} fill/> */}

            <SimpleFileDropper />
        </div>
    );
}