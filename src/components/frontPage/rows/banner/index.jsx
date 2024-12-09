import Image from "next/image";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";

export default function Banner ({items}) {
    return Render({...items[0]})
}

function Render ({image, context, priority, priorityPrefix=false, title}) {
    return (
        <div className={`${styles.header}`}>
            {image && <Image alt="Header Image" src={image} className={styles.img} width={2000} height={1000} />}
                <div className={`${styles.details} ${styles[priority]}`}>
                    <h1>
                        {priorityPrefix && <span className={styles.latest}>
                            <Pulse />
                            <span>SISTE:</span>
                        </span> }
                        {title}
                    </h1>
                    <p>{context}</p>
                </div>
            </div>
    )
}