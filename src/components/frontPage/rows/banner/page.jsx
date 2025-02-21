import Banner from "@/components/common/Banner";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";
import Link from "next/link";

export default function NewsBanner ({
    title="", pulse=false, fontSize=2.5, prefixColor="var(--primary-500)", prefix="", article, type, context="", url="", image="", imageLayout, background="var(--white-900)", color="var(--text-50)", priority=false
}) {

    return (
        <Link className={styles.c} href={`/n/${article}`} style={{fontSize: fontSize+"em"}}>
            <Banner imageLayout={imageLayout} image={image} containerStyle={{background: background, color: color}}>
                <h1>
                                {prefix && <span className={styles.priority}>
                                    {pulse && <Pulse color={prefixColor} />}
                                    {prefix?.split(" ").map((p,i) => {
                                        return <span key={i} style={{color: prefixColor}}>{p}</span>
                                    })}
                                </span>}
                                {title}
                            </h1>
                            <p>{context}</p>
            </Banner>
        </Link>
    )
}   