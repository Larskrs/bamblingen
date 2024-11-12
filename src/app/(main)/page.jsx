"use client"

import Image from "next/image";
import styles from "./page.module.css";

export default function Main () {
    return (
        <div className={styles.c}>
            <main className={styles.m}>
                <div className={`${styles.full} G-1 gap-8 normal`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=67335d341d55014bbbb5dcf3"} className={styles.img} width={1000} height={500} />
                        <p>Elever på Rønholt Skole: </p>
                        <h1>{`Flere gruer seg til å ta buss til Bamble Ungdomsskole "Blir for langt" -`}</h1>
                    </section>
                </div>

                <div className={`G-2-1 gap-8 priority`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=67335e4e1d55014bbbb5dcf4"} className={styles.img} width={700} height={250} />
                        <p>Aktuelt Studio: </p>
                        <h2>Trompeten skal spilles ved kroning av Kong Nils.</h2>
                    </section>
                    <section className={styles.videoSection}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=67335e4e1d55014bbbb5dcf4"} className={styles.img} width={700} height={250} />
                        <div className={styles.details}>
                            <p>Stathelle:</p>
                            <h2>Mann har trolig</h2>
                            <h2>falt 4-5 meter</h2>
                        </div>
                    </section>
                </div>
                <div className={`G-1-2 gap-8 normal`}>
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