import Image from "next/image";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";

export default function Header ({items}) {
    return (
        <>
            {items.map(({image, context, priority, priorityPrefix=false, title}, i) => {
                return (
                    <div className={`${styles.header} ${styles[priority]}`}>
                        {image && <Image alt="Header Image" src={image} className={styles.img} width={2000} height={1000} />}
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
                )
            })}
        </>
    );
}