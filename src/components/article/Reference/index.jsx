import Image from "next/image";
import styles from "./style.module.css";

export default function ReferenceComponent ({id, title, src}) {
    return (
        <div className={styles.c}>
            <div className={styles.text}>
                <small>Les Også</small>
                <p className={styles.title}>{title}</p>
            </div>
            <Image className={styles.img} src={src} alt={title} width={240} height={120} />
        </div>
    );
}
