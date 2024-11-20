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
                        type: "full",
                        priority: "priority",
                        articles: [ 
                            {
                                location: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            }
                        ],
                        
                    },
                    {
                        type: "double",
                        priority: "priority",
                        group: {
                            title: "Tester gruppe system",
                        },
                        articles: [ 
                            {
                                location: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            },
                            {
                                location: "Skjærkøyveien, Ragn-Sells",
                                title: "Enda en fakkel lyser opp himmelen",
                                image: {
                                    banner: "http://aktuelt.tv/api/files?fileId=673d07611d55014bbbb5dcfc"
                                }
                            }
                        ],
                        
                    }
                ]}/>
            </div>
        </div>
    );
}