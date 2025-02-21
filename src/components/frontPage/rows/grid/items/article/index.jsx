import Image from "next/image"
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse"
import ZoomInWrapper from "@/components/wrappers/ZoomInWrapper"
import LocalImage from "@/components/common/LocalImage"

export default function FullGrid ({id, context, title, image, prefixColor="var(--primary-500)", background="var(--white-900)", color="var(--text-50)", priority=false, pulse=false, prefix="", fullImage, fontSize=2}) {
    return (
        <>
            <section key={id} className={`${styles.section} ${styles[priority]}`} style={{fontSize: fontSize+"em"}}>
                    <LocalImage alt="Image" src={image} className={`${styles.img} ${fullImage && styles.fullImage}`} quality={100} width={1000} height={500} />
                    <div className={`${styles.details} ${fullImage && styles.overlay}`} style={{background: background, color: color}}>
                        <p>{context}</p>
                        <h1>
                                {prefix && <span className={styles.priority}>
                                    {pulse && <Pulse color={prefixColor} />}
                                    {prefix?.split(" ").map((p,i) => {
                                        return <span key={i} style={{color: prefixColor}}>{p}</span>
                                    })}
                                </span>}
                                {title}
                            </h1>
                    </div>
            </section>
        </>
    )
}