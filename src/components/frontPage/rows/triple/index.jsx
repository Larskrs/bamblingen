import Image from "next/image"
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse"

export default function DoubleGrid ({articles, priority="normal"}) {
    return (
        <>
                <div className={`${styles.row} G-1-1 gap-8 ${styles[priority]}`}>
                    {articles.map((a, i) => {
                        return (
                            <section key={a?.id} className={`${styles.section} ${styles[a.priority]}`}>
                                <Image alt="Image" src={a?.image.banner} className={styles.img} width={1000} height={500} />
                                <p>{a?.location}</p>
                                <h1 className={styles.title}>
                                    {a?.title}
                                </h1>
                            </section>
                        )
                    })}
                </div>
        </>
    )
}