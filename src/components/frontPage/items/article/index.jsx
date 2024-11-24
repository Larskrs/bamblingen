import Image from "next/image"
import styles from "./style.module.css"

export default function FullGrid ({id, context, title, image, priority}) {
    return (
        <>
            <section key={id} className={`${styles.section} ${styles[priority]}`}>
                <Image alt="Image" src={image.banner} className={styles.img} width={1000} height={500} />
                <div className={styles.details}>
                    <p>{context}</p>
                    <h1>{title}</h1>
                </div>
            </section>
        </>
    )
}