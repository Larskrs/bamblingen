// "use client"

// import Image from "next/image";
// import styles from "./page.module.css";
// import Pulse from "@/components/details/pulse";

// export default function Main () {
//     return (
//         <div className={styles.c}>
//             <main className={styles.m}>
//                 <div className={`${styles.full} G-1 gap-8 ${styles.priority}`}>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=673469eb1d55014bbbb5dcf6"} className={styles.img} width={1000} height={500} />
//                         <p>Skjærkøyveien, Ragn-Sells</p>
//                         <h1>{`Enda en fakkel lyser opp himmelen`}</h1>
//                     </section>
//                 </div>

//                 <div className={`${styles.row} ${styles.priority} gap-16`}>
//                     <h1 className="row gap-16">
//                         <Pulse />
//                         Grupperte saker eksempel
//                     </h1>
//                     <div className="G-2-1 gap-16">
//                         <section className={styles.section}>
//                             <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66e9c1faef8d9b0b1bc8b513"} className={styles.img} width={700} height={250} />
//                             <p>Langesund: </p>
//                             <h2>Klar for cowboy festivalen i Langesund</h2>
//                         </section>
//                         <section className={styles.videoSection}>
//                             <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66d5c36efc76034dbe113566"} className={styles.img} width={700} height={250} />
//                             <div className={styles.details}>
//                                 <p>Coop Prix Herre:</p>
//                                 <h2>Her blir siste</h2>
//                                 <h2>cowboy hatt solgt</h2>
//                             </div>
//                         </section>
//                     </div>
//                 </div>
//                 <div className={`G-1-1-1 gap-8 ${styles.normal}`}>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66b27e1c9ea5f48553e84ca7"} className={styles.img} width={700} height={300} />
//                         <p>Rønholt birøkterlag:</p>
//                         <h2>{`"Hvorfor tror de at vi ikke trenger bier?"`}</h2>
//                     </section>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
//                         <p>Sentrumsgården:</p>
//                         <h2>Revy på sentrumsgården</h2>
//                     </section>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
//                         <p>Sentrumsgården:</p>
//                         <h2>Revy på sentrumsgården</h2>
//                     </section>
//                 </div>
//                 <section className={`G-1-1 gap-16 ${styles.priority}`}>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66d5c36efc76034dbe113566"} className={styles.img} width={700} height={250} />
//                     </section>
//                     <section className={styles.section}>
//                         <Pulse />
//                         <p>Rønholt birøkterlag:</p>
//                         <h2>{`"Hvorfor tror de at vi ikke trenger bier?"`}</h2>
//                     </section>
//                 </section>
//                 <div className={`G-1-1-1 gap-8 ${styles.priority}`}>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=66b27e1c9ea5f48553e84ca7"} className={styles.img} width={700} height={300} />
//                         <p>Rønholt birøkterlag:</p>
//                         <h2>{`"Hvorfor tror de at vi ikke trenger bier?"`}</h2>
//                     </section>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
//                         <p>Sentrumsgården:</p>
//                         <h2>Revy på sentrumsgården</h2>
//                     </section>
//                     <section className={styles.section}>
//                         <Image alt="Image" src={"http://aktuelt.tv/api/files?fileId=6719fd33a042dc159a45b910"} className={styles.img} width={700} height={300} />
//                         <p>Sentrumsgården:</p>
//                         <h2>Revy på sentrumsgården</h2>
//                     </section>
//                 </div>
//             </main>
//         </div>
//     )
// }




//     Components
import FrontPageContent from "@/components/frontPage/rows"
//     Local
import styles from "./page.module.css"


export default function TestArticle () {
    return (
        <div className={styles.c}>
            <div className={styles.m}>
            <FrontPageContent rows={[
                    {
                        type: "header",
                        layout: "G_1",
                        priority: "normal",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6B",
                                type: "article",
                                priority: "priority",
                                priorityPrefix: false,
                                context: "Cowboy filming i Flå",
                                title: `«Vi har ikke kontroll» - Flå Politistasjon`,
                                image: "http://aktuelt.tv/api/files?fileId=675766acd222fb15c503bc57"
                            }
                        ],
                    },
                    {
                        type: "banner",
                        priority: "normal",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6Baef",
                                type: "article",
                                priority: "priority",
                                priorityPrefix: true,
                                context: "Artikler er ikke redaksjonelle",
                                title: `Denne nettavisen er ikke i drift!`,
                                image: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                            }
                        ],
                    },
                    {
                        type: "grid",
                        layout: "G_1",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6A",
                                type: "article",
                                priority: "priority",
                                priorityPrefix: false,
                                fullImage: false,
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Kunstustilling i Porsgrunn",
                                image: "/api/image/join?bg=black&images=http%3A%2F%2Faktuelt.tv%2Fapi%2Ffiles%3FfileId%3D67576d48d222fb15c503bc60,http://aktuelt.tv/api/files?fileId=675766acd222fb15c503bc57"
                            },
                        ],
                    },
                    {
                        type: "grid",
                        layout: "G_1_1",
                        priority: "normal",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6Dzxv",
                                type: "article",
                                priority: "normal",
                                title: "Er vi for opptatt av å filme det vi gjør?",
                                image: "http://aktuelt.tv/api/files?fileId=67576551d222fb15c503bc51"
                            },
                            {
                                id: "V1StGXR8_Z5jdHi6D",
                                type: "article",
                                fullImage: true,
                                priority: "normal",
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: "http://aktuelt.tv/api/files?fileId=66b2aa2e2f345ee36279cd88"
                            },
                        ],
                    },
                    {
                        type: "banner",
                        priority: "normal",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6Baef",
                                type: "article",
                                priority: "normal",
                                priorityPrefix: false,
                                context: "Artikler er ikke redaksjonelle",
                                title: `Denne nettavisen er ikke i drift!`,
                                image: "/api/image/join?bg=black&images=http%3A%2F%2Faktuelt.tv%2Fapi%2Ffiles%3FfileId%3D67576d48d222fb15c503bc60,http://aktuelt.tv/api/files?fileId=675766acd222fb15c503bc56"
                            }
                        ],
                    },
                    {
                        group: {
                            title: "Desperados, Banditos & Litagos",
                            priority: "normal",
                            background: "#ffefef",
                            foreground: "red",
                        },
                        type: "grid",
                        layout: "G_1_2",
                        priority: "none",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6Aaw",
                                type: "article",
                                priority: "normal",
                                priorityPrefix: false,
                                fullImage: true,
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Bambling står bak ny naturfokusert kunstustilling.",
                                image: "http://aktuelt.tv/api/files?fileId=674dda0e28ee2a35e5445500"
                            },
                            {
                                id: "V1StGXR8_Z5jdHi6Aaw",
                                type: "article",
                                priority: "normal",
                                priorityPrefix: false,
                                fullImage: false,
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Bambling står bak ny naturfokusert kunstustilling.",
                                image: "/api/files?fileId=Image.jpg"
                            },
                        ],
                    },
                ]}/>
            </div>
        </div>
    );
}