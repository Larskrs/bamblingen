"use client"

import Link from "next/link";
import styles from "./layout.module.css"
import Image from "next/image";
import Navigation from "@/components/layout/PrimaryNavigation/nav";
import Cookies from "@/components/layout/Cookies";

export default function MainLayout ({children}) {
    return (
        <>
            <Navigation />
            {/* <p>Dette nettstedet er under utvikling og har derfor ingen ekte artikler.</p> */}
            <Cookies policyId={"0.0.1"} />
            {children}
        </>
    );
}