import Image from "next/image"
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper"

export default function FullGrid ({id, context, title, image, video}) {
    return (
        <>
            <section key={id} className={styles.videoSection}>
                {/* <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66d5c36efc76034dbe113566"} className={styles.img} width={700} height={250} /> */}
                <ZoomableElement>
                    <video autoPlay loop muted className={styles.video} src={video}></video>
                </ZoomableElement>
                <div className={styles.details}>
                    <div className={styles.wrapped}>
                        {context.split(" ").map((t, i) => (<p key={t+i}>{t}</p>))}
                    </div>
                    <div className={styles.wrapped}>
                        {title.split(" ").map((t, i) => (<h2 key={t+i}>{t}</h2>))}
                    </div>
                </div>
            </section>
        </>
    )
}