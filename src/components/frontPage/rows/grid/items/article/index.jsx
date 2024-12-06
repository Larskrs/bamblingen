import Image from "next/image"
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse"
import ZoomInWrapper from "@/components/wrappers/ZoomInWrapper"

export default function FullGrid ({id, context, title, image, priority, priorityPrefix=false, fullImage}) {
    return (
        <>
            <section key={id} className={`${styles.section} ${styles[priority]}`}>
                    <Image unoptimized alt="Image" src={image} className={`${styles.img} ${fullImage && styles.fullImage}`} width={1000} height={500} />
                    <div className={`${styles.details} ${fullImage && styles.overlay}`}>
                        <p>{context}</p>
                        <h1>
                            {priorityPrefix && <span className={styles.latest}>
                                <Pulse />
                                <span>SISTE:</span>
                            </span> }
                            {title}
                        </h1>
                    </div>
            </section>
        </>
    )
}