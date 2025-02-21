import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper"
import styles from "./style.module.css"
import FrontPageContent from "@/components/frontPage/rows"

export default function ComponentPage ({rows}) {

    return (
        <div className={styles.c}>
            <MaxWidthWrapper>
                <div className={styles.content}>
                    <div className={styles.m}>
                        <FrontPageContent rows={rows}/>
                    </div>
                </div>
            </MaxWidthWrapper>
        </div>
        )
    }