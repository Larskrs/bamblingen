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
        file.data = JSON.parse(file.data)
    } catch (err) {
        logger.error(err)
        return notFound()
    }

    const size = {
        width: file.data?.size?.width,
        height: file.data?.size?.height
    }
    const aspectRatio = size?.width/size?.height
    

    logger.info(JSON.stringify(file, null, 4))

    return (
        <div className={styles.c}>
            <div className={styles.videoContainer} style={{aspectRatio: aspectRatio, width: "100%", height: "auto"}}>
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