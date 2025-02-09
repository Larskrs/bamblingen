import VideoPlayer from "@/components/common/VideoPlayer";
import styles from "./page.module.css"
import logger from "logger.mjs";
import { GetUniqueFile } from "@/lib/fileLib"
import { notFound } from "next/navigation";

export default async function WatchPage ({params, searchParams}) {

    const { v } = await searchParams
    let file = null

    try {
        file = await GetUniqueFile(v)
    } catch (err) {
        logger.error(err)
        return notFound()
    }

    return (
        <div className={styles.c}>
            <div className={styles.videoContainer}>
                <VideoPlayer
                    className={styles.video}
                    poster={`/api/v1/files/video/thumbnail?v=${v}`}
                    src={`/api/v1/files/video?v=${v}#t=1`}
                    />
            </div>
            <nav className={styles.bar}>
                <h2>{file.name}</h2>
            </nav>
        </div>
    );
}