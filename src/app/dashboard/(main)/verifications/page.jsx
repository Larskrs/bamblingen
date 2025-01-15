"use client"

import Image from "next/image";
import styles from "./page.module.css"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import Expandable from "@/components/editor/input/Expandable";
import { TimeAgo } from "@/lib/timeLib";
import { useState } from "react";
import { GetType, GetVerificationStatus } from "@/lib/articleLib";
import NewsArticlePage from "@/app/(main)/news/[id]/client";

const url = (page) =>
    `/api/v1/articles/verifications`;

export default function Verifications () {

    const { data, error, loading, loadMore } = useInfiniteFetch(url)

    console.log(data && data)
    
    return (
        <div className={styles.c} >
            <h2>Versjonslogg</h2>

            <VerificationList verifications={data} />
        </div>
    );
}

function VerificationList ({verifications}) {

    if (!verifications) {
        return <p>...</p>
    }

    return (
        <div className={styles.list}>

            <table className={styles.table}>

                <thead>
                    <tr>
                        <td></td>
                        <td>Tittel</td>
                        <td>Status</td>
                        <td>Forfatter</td>
                        <td>Redaktør</td>
                    </tr>
                </thead>
                <tbody>
                {verifications.map((v) => <TableRow v={v} key={v.id+"1"} />)}
                </tbody>
            </table>
        </div>
    )
}


function TableRow ({v}) {

    const [isExpanded, setIsExpanded] = useState(false)
    const version = v.articleVersion

    return (
        <>
            <tr onClick={() => {setIsExpanded(!isExpanded)}} className={`${styles.verification} ${isExpanded && styles.expandedHeader}`}>
                <td className={styles.thumbnail}>
                    <Image alt="artikkelVersionBilde" width={256} height={256} src={v.articleVersion.image} />
                </td>
                <td className={styles.col}>
                    <h4>{v.articleVersion.title}</h4>
                    <p>{v.articleVersion.subtitle}</p>
                </td>
                <td className={styles.col}>
                    <p className={styles.time}>{TimeAgo(new Date(v.articleVersion.createdAt))}</p>
                    <div className={styles.status}>{GetVerificationStatus(v.status).name}</div>
                    <div className={styles.type} style={{color: GetType(v.articleVersion.article.type).color}}>{GetType(v.articleVersion.article.type).name}</div>
                </td>
                <td className={styles.col}>
                    <div className={styles.userCol}>
                        <Image width={64} height={64} alt="applicant-avatar" src={v.applicant.image} />
                        <p>{v.applicant.name}</p>
                    </div>
                </td>
                <td className={styles.col}>
                    {v.reviwerId
                    ? <div className={styles.userCol}>
                        <Image width={64} height={64} alt="reviwer-avatar" src={v.reviwer.image} />
                        <p>{v.reviwer.name}</p>
                    </div>
                    : <div className={styles.userCol}>
                        <p>Ikke vurdert</p>
                    </div>
                    }
                </td>
            </tr>
            {isExpanded &&
                <tr className={styles.b} key={v.id+"body"}>
                    <td colSpan={5}>
                        <div className={styles.body}>
                            {/* <h3>{v.articleVersion.title}</h3> */}
                            <div className={styles.type} style={{padding: "0.5rem, 0.25rem", background: GetType(v.articleVersion.article.type).color}}>{GetType(v.articleVersion.article.type).name}</div>

                            <select className={styles.verifyField}>
                                <option></option>
                                <option></option>
                                <option></option>
                            </select>

                            {/* <NewsArticlePage version={version} session={null} article={v.articleVersion.article} /> */}
                        </div>
                    </td>
                </tr>
            }
        </>
    )

}