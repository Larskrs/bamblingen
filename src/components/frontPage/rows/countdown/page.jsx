"use client"
import Image from "next/image";
import styles from "./style.module.css"
import Pulse from "@/components/details/pulse";
import CountdownTimer from "@/components/common/CountdownTimer";
import { useState } from "react";


export default function Header ({items}) {
    return Render({...items[0]})
}

function Render ({image, context, priorityPrefix=false, title}) {
    return (
        <div className={styles.header}>
            <Image alt="Header Image" src={image} className={styles.img} width={2000} height={1000} />
            <div className={styles.bottom}>
                <h2>Vi åpner om...</h2>
                <CountdownTimer targetDate={new Date('2025-02-06T00:00:00Z')} />
            </div>
        </div>
    )
}