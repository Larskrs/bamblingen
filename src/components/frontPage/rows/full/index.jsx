import Image from "next/image"
import styles from "./style.module.css"

export default function FullGrid ({articles, priority="normal"}) {
    return (
        <>
                <div className={`${styles.full} G-1 gap-8 ${styles[priority]}`}>
                    {articles.map((a, i) => {
                        return (
                            <section className={styles.section}>
                                <Image alt="Image" src={a?.image.banner} className={styles.img} width={1000} height={500} />
                                <p>{a?.location}</p>
                                <h1>{a?.title}</h1>
                            </section>
                        )
                    })}
                </div>
        </>
    )
}