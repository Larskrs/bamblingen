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
import { useRouter } from "next/navigation";
import Spinner from "@/components/details/spinner";

const url = (page) =>
    `/api/v1/articles?sa=true&so=v`;

export default function Verifications () {
    
    return (
        <div className={styles.c} >
            {/* <h1>Versjonslogg</h1> */}
            <ArticleList />
        </div>
    );
}

function ArticleList () {

    const { data, error, loading, loadMore } = useInfiniteFetch(url)
    const router = useRouter()

    if (loading) {
        return <p style={{fontSize: "2rem"}}><Spinner /></p>
    }
    if (error) 
        return <p style={{fontSize: "1rem"}}>{error.message}</p>

    return (
        <div className={styles.list}>

            <table className={styles.table}>

                <thead className={styles.thead}>
                    <tr>
                        <td></td>
                        <td className={styles.col}></td>
                        <td>Tittel</td>
                        <td>Forfattere</td>
                        <td>Info</td>
                    </tr>
                </thead>
                <tbody>
                {data.map((a, i) => {
                    return <React.Fragment key={a.id}>  
                            <tr style={{visibility: "hidden", height: "0.5rem"}}></tr>
                            <TableRow onSelectArticle={(id) => {router.push(`/dashboard/article/${id}`)}} a={a} />
                    </React.Fragment>
                })}
                </tbody>
            </table>
        </div>
    )
}


function TableRow ({a, onSelectArticle}) {

    const version = a?.versions?.[0]
    console.log({a})

    return (
        <>
            <tr onClick={()=>onSelectArticle(a.id)} className={`${styles.verification}`}>
                <td className={styles.thumbnail}>
                    <Image alt="artikkelVersionBilde" width={256} height={256} src={version.image.src} />
                </td>
                <td className={styles.col}></td>
                <td className={classNames(styles.col, styles.title)}>
                    <h4>{version.title}</h4>
                    <p>{version.subtitle}</p>
                </td>
                <td className={classNames(styles.col)}>
                    <p>{a.id}</p>
                </td>
                <td className={styles.col}>
                    {a.authors.map((author, aid) => {
                        return (<div key={author.id} className={styles.userCol}>
                            <Image width={64} height={64} alt="applicant-avatar" src={author.image} />
                            <p>{author.name}</p>
                        </div>)
                    })}
                </td>
            </tr>
        </>
    )

}