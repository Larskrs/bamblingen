import Image from "next/image";
import styles from "./style.module.css"

export default function TextComponent ({id, src, alt, credit}) {
    return (
        <div className={styles.c}>
            <Image className={styles.img} src={src} alt={alt} width={500} height={500} />
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
        </div>
    );
}