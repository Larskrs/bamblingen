//     Components
import FrontPageContent from "@/components/frontPage/rows/FrontPageRow"
//     Local
import styles from "./page.module.css"


export default function TestArticle () {
    return (
        <div className={styles.c}>
            <div className={styles.m}>
            <FrontPageContent rows={[
                    {
                        layout: "G-1",
                        priority: "priority",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6B",
                                type: "article",
                                priority: "priority",
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            }
                        ],
                    },
                    {
                        layout: "G-1-1-1",
                        priority: "priority",
                        group: {
                            title: "Brann på skjærkøya"
                        },
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6A",
                                type: "video",
                                priority: "normal",
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                video: "http://aktuelt.tv/api/files?fileId=671eac91a042dc159a45b919",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            },
                            {
                                id: "V1StGXR8_Z5jdHi6C",
                                type: "article",
                                priority: "priority",
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            },
                            {
                                id: "V1StGXR8_Z5jdHi67",
                                type: "video",
                                priority: "priority",
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                video: "http://aktuelt.tv/api/files?fileId=673d0a3d1d55014bbbb5dd01",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            }
                        ],
                    },
                    {
                        layout: "G-1",
                        priority: "normal",
                        items: [
                            {
                                id: "V1StGXR8_Z5jdHi6D",
                                type: "article",
                                priority: "normal",
                                context: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            }
                        ],
                    },
                ]}/>
            </div>
        </div>
    );
}