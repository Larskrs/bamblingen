import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";

export default function ReferenceComponent ({id, title, src}) {
    return (
        <Link className={styles.c} href={`/n/${id}`}>
            <div className={styles.text}>
                <small>Les Også</small>
                <p className={styles.title}>{title}</p>
            </div>
            <Image className={styles.img} src={src} alt={title} width={240} height={120} />
        </Link>
    );
}
