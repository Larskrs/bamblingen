"use client"

import Image from "next/image";
import styles from "./page.module.css"
import { FileList } from "@/components/common/FileList";
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import SimpleFileDropper from "@/components/editor/input/SimpleFileDropper";
import { FileExplorer } from "@/components/common/FileExplorer";

const url = (page) =>
    `/api/v1/files/list`;

export default function Batches () {

    const { data, error, loading, loadMore } = useInfiniteFetch(url)

    return (
        <div className={styles.c} >
            {/* <Image style={{objectFit: "cover", scale: "1.1"}} alt="image" src={"http://aktuelt.tv/api/files?fileId=675c5320d222fb15c503bc6c"} fill/> */}

            <SimpleFileDropper />

            <FileExplorer />
            {/* <FileList files={data} /> */}
        </div>
    );
}