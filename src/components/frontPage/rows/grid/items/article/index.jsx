import Image from "next/image"
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse"
import ZoomInWrapper from "@/components/wrappers/ZoomInWrapper"
import LocalImage from "@/components/common/LocalImage"

export default function FullGrid ({id, context, title, image, priority, priorityPrefix=false, fullImage, fontSize=2}) {
    return (
        <>
            <section key={id} className={`${styles.section} ${styles[priority]}`}>
                    <LocalImage alt="Image" src={image} className={`${styles.img} ${fullImage && styles.fullImage}`} quality={100} width={1000} height={500} />
                    <div className={`${styles.details} ${fullImage && styles.overlay}`}>
                        <p>{context}</p>
                        <h1 style={{fontSize: `${fontSize}rem`}}>
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