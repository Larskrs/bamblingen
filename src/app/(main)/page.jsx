import Image from "next/image";
import styles from "./page.module.css";

export default function Main () {
    return (
        <div className={styles.c}>
            <main className={styles.m}>
                <div className={`${styles.full} G-1 gap-8`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={1000} height={500} />
                        <p>Aktuelt Studio: </p>
                        <h1>DBL blir en av verdens værste filmer...</h1>
                    </section>
                </div>

                <div className={`G-2-1 gap-8`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=672c88f91d55014bbbb5dcee"} className={styles.img} width={700} height={250} />
                        <h2>Trompeten skal spilles ved kroning av Kong Nils.</h2>
                    </section>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=672c88fa1d55014bbbb5dcef"} className={styles.img} width={700} height={250} />
                        <h2>DBL blir en av verdens værste filmer...</h2>
                    </section>
                </div>
                <div className={`G-1-2 gap-8`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
                        <h2>DBL blir en av verdens værste filmer...</h2>
                    </section>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
                        <h2>DBL blir en av verdens værste filmer...</h2>
                    </section>
                </div>
            </main>
        </div>
    )
}