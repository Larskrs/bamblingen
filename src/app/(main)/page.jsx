import Image from "next/image";
import styles from "./page.module.css";

export default function Main () {
    return (
        <div className={styles.c}>
            <main className={styles.m}>
                <div className={styles.row}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={1000} height={500} />
                        <h1>DBL blir en av verdens værste filmer...</h1>
                    </section>
                </div>

                <div className={styles.row}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66b27e1c9ea5f48553e84ca7"} className={styles.img} width={700} height={250} />
                        <h2>Vil finne nye veier for insektene</h2>
                    </section>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6702a9fa677fd1852bb4a94c"} className={styles.img} width={700} height={250} />
                        <h2>DBL blir en av verdens værste filmer...</h2>
                    </section>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6702a9fa677fd1852bb4a94c"} className={styles.img} width={700} height={250} />
                        <h2>DBL blir en av verdens værste filmer...</h2>
                    </section>
                </div>
                <div className={styles.row}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
                        <h3>DBL blir en av verdens værste filmer...</h3>
                    </section>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
                        <h3>DBL blir en av verdens værste filmer...</h3>
                    </section>
                </div>
            </main>
        </div>
    )
}