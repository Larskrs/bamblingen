"use client"

import Link from "next/link";
import styles from "./nav.module.css"
import Image from "next/image";
import { usePathname } from 'next/navigation'
import UserAvatar from "@/components/common/Authentication/UserAvatar"
import NavigationDropDown from "../NavigationDropDown";
import { useState } from "react";

export default function Navigation () {

    const links = [
        { href: "/nyheter", display: "Nyheter"},
        { href: "/radio", display: "Radio"},
        // { href: "/ai-artikkel", display: "AI"},
        // { href: "/meninger", display: "Meninger"},
        // { href: "/satire", display: "Satire"},
        // { href: "/tips", display: "Tips oss"},
        // { href: "/calendar", display: "Kalender"},
    ]

    const [expanded, setExpanded] = useState(false)
    const pathname = usePathname()

    return (
        <div className={styles.c}>

            <nav className={styles.nav} 
                onMouseOver={() => {setExpanded(true)}}
                onMouseLeave={() => {setExpanded(false)}}
                >
                    <Link href={"/"} className={styles.logo}>
                        <div className={styles.image}>
                            <Image src={"/logo/logo_phoneless.svg"} alt="bambl2ngen logo" quality={50} width={64} height={64} />
                            <Image src={"/logo/logo_megaphone_border.svg"} alt="bambl2ngen logo" quality={50} width={64} height={64} />
                        </div>
                        <h3>Bamblingen</h3>
                    </Link>
                    <div className={styles.links}>
                            {links.map(link =>
                                    <Link className={pathname === link.href ? styles.active : styles.inactive} key={link.href} href={link.href}>{link.display}</Link>
                                )}
                        {/* <Link href={"/dsib"}>Det skjer i Bamble</Link> */}
                    </div>

                    <NavigationDropDown expanded={expanded} />
                    <UserAvatar ></UserAvatar> 
            </nav>

            <NavigationDropDown expanded={expanded} />

        </div>
    );
}