import Image from "next/image"
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper"

export default function FullGrid ({id, image    }) {
    return (
        <>
            <section key={id} className={styles.section}>
                <Image  alt="Image" src={image} className={`${styles.img} ${styles.fullImage}`} width={1000} height={500} />
            </section>
        </>
    )
}