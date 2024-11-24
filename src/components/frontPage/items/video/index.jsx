import Image from "next/image"
import styles from "./style.module.css"

export default function FullGrid ({id, context, title, image, video}) {
    return (
        <>
            <section key={id} className={styles.videoSection}>
                {/* <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66d5c36efc76034dbe113566"} className={styles.img} width={700} height={250} /> */}
                <video autoPlay loop muted className={styles.video} src={video}></video>
                <div className={styles.details}>
                    <p>{context}</p>
                    <h2>Her blir siste</h2>
                    <h2>cowboy hatt solgt</h2>
                </div>
            </section>
        </>
    )
}