import Image from "next/image"
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse"

export default function FullGrid ({id, context, title, image, priority, priorityPrefix=false}) {
    return (
        <>
            <section key={id} className={`${styles.section} ${styles[priority]}`}>
                <Image alt="Image" src={image} className={styles.img} width={1000} height={500} />
                <div className={styles.details}>
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