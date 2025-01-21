import Image from "next/image";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";

export default function ({
    image,
    context, 
    containerStyle={background: "var(--white-900)"},
    priorityPrefix=false,
    title,
    children
}) {
    return (
        <div style={containerStyle} className={`${styles.header}`}>
            {image && <Image alt="Header Image" src={image} className={styles.img} width={2000} height={1000} />}
                <div className={styles.details}>
                    {children}
                </div>
            </div>
    )
}