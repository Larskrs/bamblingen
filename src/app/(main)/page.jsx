"use client"

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
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";


export default function TestArticle () {

    return (
                <MaxWidthWrapper>
        <div className={styles.c}>
            <div className={styles.m}>

            <FrontPageContent rows={[
                {
                    type: "banner",
                    id: "V1StGXR8_Z5jdHi6Baef",
                    article: "20250115-ef2b3a",
                    background: "var(--secondary-25)",
                    color: "white",
                    priority: false,
                    priorityPrefix: false,
                    context: "Artikler er ikke redaksjonelle",
                    title: `Denne nettavisen er ikke i drift!`,
                    image: "https://bamblingen.no/api/v1/files?fileId=20250110-c8e464892340fcf52ead4c0eb810f8a5fad39c38abe58d06"
                },
                {
                        type: "grid",
                        layout: "G_FULL",
                        priority: "normal",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6Aaw",
                                type: "article",
                                priority: "priority",
                                priorityPrefix: true,
                                fullImage: false,
                                context: "Bøytralist-partiet blir satt inn i med 100% av setene i stortinget",
                                title: "«Nå er det bare bøytralister her»",
                                image: "https://bamblingen.no/api/v1/files?fileId=20250110-c8e464892340fcf52ead4c0eb810f8a5fad39c38abe58d06",
                                fontSize: 3.5,
                            },
                        ],
                    },
                    
                    {
                        type: "grid",
                        layout: "G_1_2",
                        priority: "none",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6A",
                                type: "article",
                                priority: "normal",
                                priorityPrefix: false,
                                fullImage: false,
                                context: "Langesund",
                                title: "Mangler artikkel",
                                image: "/images/langesund.jpeg",
                                fontSize: 2,
                            },
                            {
                                id: "V1StGXR8_Z5jdHi6Aaw",
                                type: "article",
                                priority: "normal",
                                priorityPrefix: false,
                                fullImage: false,
                                context: "Oppmøtet på langesund på 17.mai i 2023",
                                title: "«Mindre enn forventet»",
                                image: "https://bamblingen.no/api/v1/files?fileId=20250105-b217d32b83c1660f3835d7b399c2794fe93e6e34c22599d6"
                            },
                        ],
                    },
                    {
                        type: "grid",
                        layout: "G_2_1",
                        priority: "none",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6A",
                                type: "video",
                                priority: "priority",
                                priorityPrefix: false,
                                fullImage: false,
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Mangler Artikkel",
                                poster: "https://bamblingen.no/api/v1/files/video/thumbnail?v=20250214-27b37df91a4e4627",
                                video: "https://bamblingen.no/api/v1/files/video?v=20250214-27b37df91a4e4627"
                            },
                            {
                                id: "V1StGXR8_Z5jdHi6Aaw",
                                type: "article",
                                priority: "priority",
                                priorityPrefix: true,
                                fullImage: true,
                                context: "Oslo",
                                title: "Vil Carl finne kjærligheten i Oslo?",
                                image: "https://bamblingen.no/api/v1/files?fileId=20250103-d27c272bf4a1f1c3bcc96177ecf0cff6f9e71eb6c320ac79"
                            },
                        ],
                    },
                ]}/>
            </div>
        </div>
                    </MaxWidthWrapper>
    );
}