import Image from "next/image";
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper";
import Editor from "./editor"

const config = {
    icon: "/icons/icon_file_video.svg",
    renderer: VideoComponent,
    name: "video",
    description: "Element for å vise en rekke audiovisuelle medier, med bildetekst og bildekilde",
    previewText: (data) => {return data.alt || data.src},
    editor: Editor,
    default: {
        type: "video",
        src: "/images/langesund.jpeg",
        alt: "Bildetekst",
        credit: "Foto: Bamblingen.no"
    }
}

export function VideoComponent ({id, src, alt, credit, editor, onChange=()=>{}}) {

    return (
        <div className={styles.c}>
            <video controls className={styles.video} src={src} alt={alt} width={500} height={500} />
            <div>
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
            </div>
        </div>
    );
}

export default config
