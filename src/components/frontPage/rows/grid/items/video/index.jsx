import Image from "next/image"
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper"

export default function FullGrid ({id, context, title, image, video}) {
    return (
        <>
            <section key={id} className={styles.videoSection}>
                {/* <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66d5c36efc76034dbe113566"} className={styles.img} width={700} height={250} /> */}
                <video className={styles.video} playsInline width="320" height="240" controls preload="none">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
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