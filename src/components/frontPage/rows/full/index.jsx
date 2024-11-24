import Image from "next/image"
import styles from "./style.module.css"

export default function FullGrid ({articles, priority="normal"}) {
    return (
        <>
                <div className={`${styles.full} G-1`}>
                    {articles.map((a, i) => {
                        return (
                            <section key={a?.id} className={`${styles.section} ${styles[a.priority]}`}>
                                <Image alt="Image" src={a?.image.banner} className={styles.img} width={1000} height={500} />
                                <div className={styles.details}>
                                    <p>{a?.location}</p>
                                    <h1>{a?.title}</h1>
                                </div>
                            </section>
                        )
                    })}
                </div>
        </>
    )
}