import Image from "next/image";
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper";
import Editor from "./editor"
import VideoPlayer from "@/components/common/VideoPlayer";

const config = {
    icon: "/icons/icon_file_video.svg",
    renderer: VideoComponent,
    name: "video",
    description: "Element for å vise en rekke audiovisuelle medier, med bildetekst og bildekilde",
    previewText: (data) => {return data.alt || data.src},
    previewBackground: (data) => { return null },
    editor: Editor,
    default: {
        type: "video",
        src: "/images/langesund.jpeg",
        poster: "/images/langesund.jpeg",
        alt: "Bildetekst",
        credit: "Foto: Bamblingen.no"
    }
}

export function VideoComponent ({id, poster, src, alt, credit, editor, onChange=()=>{}}) {

    return (
        <div className={styles.c}>
            <VideoPlayer poster={poster} controls className={styles.video} src={src} alt={alt} width={500} height={500} />
            <div>
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
            </div>
        </div>
    );
}

export default config
