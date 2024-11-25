import Image from "next/image";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";


export default function Header ({items}) {
    return Render({...items[0]})
}

function Render ({image, context, priorityPrefix=false, title}) {
    return (
        <div className={styles.header}>
            <Image alt="Header Image" src={image} className={styles.img} width={2000} height={1000} />
            <div className={styles.bottom}>
                <div className={styles.details}>
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
        </div>
    )
}