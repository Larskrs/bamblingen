import Banner from "@/components/common/Banner";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";
import Link from "next/link";

export default function NewsBanner ({
    title="", pulse=false, prefix="SISTE:", article, type, context="", url="", image="", background="var(--white-900)", color="var(--text-50)", priority=false
}) {

    return (
        <Link className={styles.c} href={`/n/${article}`}>
            <Banner containerStyle={{background: background, color: color}}>
                <h1>
                                <span className={styles.priority}>
                                    {pulse && <Pulse />}
                                    <span>{prefix}</span>
                                </span>
                                {title}
                            </h1>
                            <p>{context}</p>
            </Banner>
        </Link>
    )
}   