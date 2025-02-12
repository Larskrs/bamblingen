import VideoPlayer from "@/components/common/VideoPlayer";
import styles from "./page.module.css"
import logger from "logger.mjs";
import { GetUniqueFile } from "@/lib/fileLib"
import { notFound } from "next/navigation";

import { Metadata } from "next";

export async function NoVideoFoundMetadata () {
    return {
        title: "(Invalid URL) Unknown Video",
        description: `This url is not valid`
    }
}

export async function generateMetadata({params, searchParams}) {
    
    const { v } = await searchParams
    if (!v) {
        return await NoVideoFoundMetadata()
    }

    let video
    try {
        video = await GetUniqueFile(v)
        video.data = JSON.parse(video.data)
    } catch (err) {
        logger.error({message: err})
        return notFound()
    }

    const videoTitle = `Watch Video ${video.name}`;
    const videoThumbnail = `https://bamblingen.no/api/v1/files/video/thumbnail?v=${v}`;

    return {
        title: videoTitle,
        description: `Enjoy watching video ${v}`,
        openGraph: {
                title: videoTitle,
                description: `Check out this video: ${video.name}`,
                url: `https://bamblingen.no/watch?v=${v}`,
                images: [
                    {
                        url: videoThumbnail,
                        width: video?.data?.size?.width || 720,
                        height: video?.data?.size?.height || 405,
                        alt: `Thumbnail for video ${video.name}`,
                    },
                ],
                type: "video.other",
            },
            twitter: {
                card: "summary_large_image",
                title: videoTitle,
                description: `Watch video ${v}`,
                images: [videoThumbnail],
            },
    };
}

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