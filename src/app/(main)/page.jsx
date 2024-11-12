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
                        <p>Bamble Ungdomskole: </p>
                        <h1>{`Husk at alle artikler på denne sida er bare falske nå. Følg med på når vi lanserer`}</h1>
                    </section>
                </div>

                <div className={`${styles.row} priority gap-16`}>
                    <h1>Grupperte saker eksempel</h1>
                    <div className="G-2-1 gap-16">
                        <section className={styles.section}>
                            <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66e9c1faef8d9b0b1bc8b513"} className={styles.img} width={700} height={250} />
                            <p>Langesund: </p>
                            <h2>Klar for cowboy festivalen i Langesund</h2>
                        </section>
                        <section className={styles.videoSection}>
                            <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66d5c36efc76034dbe113566"} className={styles.img} width={700} height={250} />
                            <div className={styles.details}>
                                <p>Coop Prix Herre:</p>
                                <h2>Her blir siste</h2>
                                <h2>cowboy hatt solgt</h2>
                            </div>
                        </section>
                    </div>
                </div>
                <div className={`G-1-2 gap-8 normal`}>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66b27e1c9ea5f48553e84ca7"} className={styles.img} width={700} height={300} />
                        <p>Rønholt birøkterlag:</p>
                        <h2>{`"Hvorfor tror de at vi ikke trenger bier?"`}</h2>
                    </section>
                    <section className={styles.section}>
                        <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
                        <p>Sentrumsgården:</p>
                        <h2>Revy på sentrumsgården</h2>
                    </section>
                </div>
            </main>
        </div>
    )
}