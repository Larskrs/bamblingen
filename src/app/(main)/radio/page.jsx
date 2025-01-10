import Image from "next/image";
import styles from "./page.module.css"

export default function RadioPage ({}) {
    return (
        <div className={styles.c}>
            <div className={styles.background}>
                <Image alt="background" src={`/images/audio.JPG`} width={1296} height={864} quality={75} />
            </div>
        </div>
    );
}