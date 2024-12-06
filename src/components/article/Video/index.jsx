import Image from "next/image";
import styles from "./style.module.css"

export default function VideoComponent ({id, src, alt, credit}) {
    return (
        <div className={styles.c}>
            <video className={styles.video} src={src} alt={alt} width={500} height={500} />
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
        </div>
    );
}