import Image from "next/image"
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse"

export default function FullGrid ({articles, priority="normal"}) {
    return (
        <>
                <div className={`${styles.row} G-1-1 gap-8 ${styles[priority]}`}>
                    {articles.map((a, i) => {
                        return (
                            <section className={styles.section}>
                                <Image alt="Image" src={a?.image.banner} className={styles.img} width={1000} height={500} />
                                <p>{a?.location}</p>
                                <h1 className={styles.row}>
                                    <Pulse />
                                    {a?.title}
                                </h1>
                            </section>
                        )
                    })}
                </div>
        </>
    )
}