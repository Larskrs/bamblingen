//     Components
import ArticleContent from "@/components/article/ArticleContent"
//     Local
import styles from "./page.module.css"


export default function TestArticle () {
    return (
        <div className={styles.c}>
            <div className={styles.m}>
                <ArticleContent components={[
                    {
                        type: "heading",
                        level: 1,
                        headingText: "OBS! Ikke en artikkel"
                    },
                    {
                        type: "text",
                        lines: [
                            "OBS!! pass på nå!",
                            "Denne artikkelsiden er bare i bruk for å teste artikkel funksjoner."
                        ]
                    },
                    {
                        type: "image",
                        src: "http://aktuelt.tv/api/files?fileId=674dda0e28ee2a35e54454ff",
                        alt: "Daniel vandrer i skogen for en legendarisk pissepause",
                        credit: "Foto: Lars Kristian Småge Syvertsen"
                    },
                    {
                        type: "text",
                        lines: [
                            "1",
                            "2",
                            "3"
                        ]
                    },
                    {
                        type: "reference",
                        src: "http://aktuelt.tv/api/files?fileId=66e9c1faef8d9b0b1bc8b513",
                        title: "Nordmenn har 170 milliarder i forbruksgjeld – «Jens» spilte bort mange millioner",
                        alt: "Daniel vandrer i skogen for en legendarisk pissepause",
                        credit: "Foto: Lars Kristian Småge Syvertsen"
                    },
                ]}/>
            </div>
        </div>
    );
}