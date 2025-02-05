"use client"

import Image from "next/image";
import styles from "./page.module.css"
import VideoPlayer from "@/components/common/VideoPlayer";

export default function RadioPage ({}) {
    return (
        <div className={styles.c}>
            <div className={styles.background}>
                <Image alt="background" src={`/images/audio.JPG`} width={1296} height={864} quality={75} />
                
            </div>
            <VideoPlayer src={"/api/v1/files/video?v=20250205-2cabbe2cd51b93d8"} />
        </div>
    );
}