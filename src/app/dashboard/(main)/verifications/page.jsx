"use client"

import Image from "next/image";
import styles from "./page.module.css"
import useInfiniteFetch from "@/hooks/useInfiniteFetch";
import Expandable from "@/components/editor/input/Expandable";
import { TimeAgo } from "@/lib/timeLib";
import React, { useState } from "react";
import { GetType, GetVerificationStatus } from "@/lib/articleLib";
import NewsArticlePage from "@/app/(main)/(default)/news/[id]/client";
import Margin from "@/components/common/Margin";
import classNames from "classnames";
import Spinner from "@/components/details/spinner";

const url = (page) =>
    `/api/v1/articles/verifications`;

export default function Verifications () {

    const { data, error, loading, loadMore } = useInfiniteFetch(url)

    console.log(data && data)
    
    return (
        <div className={styles.c} >
            {/* <h1>Versjonslogg</h1> */}
            <VerificationList verifications={data} />
        </div>
    );
}

function VerificationList ({verifications}) {

    if (!verifications) {
        return <p style={{fontSize: "2rem"}}><Spinner /></p>
    }

    return (
        <div className={styles.list}>

            <table className={styles.table}>

                <thead className={styles.thead}>
                    <tr>
                        <td></td>
                        <td className={styles.col}></td>
                        <td>Tittel</td>
                        <td>Status</td>
                        <td>Forfatter</td>
                        <td>Redaktør</td>
                    </tr>
                </thead>
                <tbody>
                {verifications.map((v) => {
                    return <React.Fragment key={v.id}>  
                        <tr style={{visibility: "hidden", height: "0.5rem"}}></tr>
                        <TableRow v={v} />
                    </React.Fragment>
                })}
                </tbody>
            </table>
        </div>
    )
}


function TableRow ({v}) {

    const version = v.articleVersion

    return (
        <>
            <tr className={`${styles.verification}`}>
                <td className={styles.thumbnail}>
                    <Image alt="artikkelVersionBilde" width={256} height={256} src={v.articleVersion.image.src} />
                </td>
                <td className={styles.col}></td>
                <td className={classNames(styles.col, styles.title)}>
                    <h4>{v.articleVersion.title}</h4>
                    <p>{v.articleVersion.subtitle}</p>
                </td>
                <td className={styles.col}>
                    <p className={styles.time}>{TimeAgo(new Date(v.articleVersion.createdAt))}</p>
                    <div className={styles.status} style={{backgroundColor: GetVerificationStatus(v.status).color.background, color: GetVerificationStatus(v.status).color.text}}>{GetVerificationStatus(v.status).name}</div>
                    <Margin.Block amount={0.25} />
                    {/* <div className={styles.type} style={{backgroundColor: GetType(v.articleVersion..type).color}}>{GetType(v.articleVersion.article.type).name}</div> */}
                </td>
                <td className={styles.col}>
                    <div className={styles.userCol}>
                        <Image width={64} height={64} alt="applicant-avatar" src={v.applicant.image} />
                        <p>{v.applicant.name}</p>
                    </div>
                </td>
                <td className={styles.col}>
                    {v.reviewerId
                    ? <div className={styles.userCol}>
                        <Image width={64} height={64} alt="reviwer-avatar" src={v.reviewer.image} />
                        <div className={styles.col}>
                            <p>{v.reviewer.name}</p>
                            <div className={styles.status} style={{background: GetVerificationStatus(v.status).color}}>{GetVerificationStatus(v.status).name}</div>
                        </div>
                    </div>
                    : <div className={styles.userCol}>
                        <p>Ikke vurdert</p>
                    </div>
                    }
                </td>
            </tr>
        </>
    )

}