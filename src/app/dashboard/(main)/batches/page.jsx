"use server"

import Image from "next/image";
import styles from "./page.module.css"
import { FileExplorer } from "@/components/common/FileExplorer";

export default async function Batches ({params, searchParams}) {

    const { b } = await searchParams

    return (
        <div className={styles.c} >
            {/* <Image style={{objectFit: "cover", scale: "1.1"}} alt="image" src={"http://aktuelt.tv/api/files?fileId=675c5320d222fb15c503bc6c"} fill/> */}

            <FileExplorer defaultBatch={b} modal={false} />
            {/* <FileList files={data} /> */}
        </div>
    );
}