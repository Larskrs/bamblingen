"use client"

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
                        <h1>DBL filming blir ikke ferdig på kortest mulig tid.</h1>
                    </section>
                </div>

                <div className={`G-2-1 gap-8`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=672c88f91d55014bbbb5dcee"} className={styles.img} width={700} height={250} />
                        <p>Aktuelt Studio: </p>
                        <h2>Trompeten skal spilles ved kroning av Kong Nils.</h2>
                    </section>
                    <section className={styles.videoSection}>
                        <video alt="Image" src={"http://aktuelt.tv/api/files?fileId=673252e01d55014bbbb5dcf1#t=0.1"} className={styles.img} width={700} height={250} />
                        <div className={styles.details}>
                            <p>Aktuelt Studio:</p>
                            <h2>DBL blir en</h2>
                            <h2>av verdens</h2>
                            <h2>værste filmer...</h2>
                        </div>
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