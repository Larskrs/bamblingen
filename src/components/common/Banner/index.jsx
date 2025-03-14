import Image from "next/image";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";
import classNames from "classnames";

export default function Banner ({
    image,
    imageLayout="contain",
    context, 
    containerStyle={background: "var(--white-900)"},
    priorityPrefix=false,
    title,
    className,
    children
}) {
    return (
        <div style={containerStyle} className={classNames(styles.header, className)}>
            <div className={styles.content}>
                {image && <div className={styles.img}>
                    <img style={{objectFit: imageLayout}} alt="Header Image" src={image} />
                </div>}
                <div className={styles.details} style={{gridColumnEnd: 3, gridColumnStart: 
                    image ? 2 : 1
                }}>{children}</div>
            </div>
        </div>
    )
}