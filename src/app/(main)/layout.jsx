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
            <Cookies policyId={"0.0.1"} />
            {children}
        </>
    );
}