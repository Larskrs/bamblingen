import Image from "next/image";
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper";

export default function TextComponent ({id, src, alt, credit}) {
    return (
        <div className={styles.c}>
            <ZoomableElement>
            <Image className={styles.img} src={src} alt={alt} width={500} height={500} />
            </ZoomableElement>
            <div>
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
            </div>
        </div>
    );
}