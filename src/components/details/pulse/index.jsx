
import styles from "./style.module.css"

export default function Pulse ({color="var(--primary-500)"}) {
    return (
        <span className={styles.c}>
            <div className={styles.p} style={{backgroundColor: color}}></div>
        </span>
    );
}