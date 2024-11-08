"use client"

import Link from "next/link";
import styles from "./nav.module.css"
import Image from "next/image";
import { usePathname } from 'next/navigation'

export default function Navigation () {

    const links = [
        { href: "/nyheter", display: "Nyheter"},
        { href: "/meninger", display: "Meninger"},
        { href: "/tips", display: "Tips oss"},
        { href: "/calendar", display: "Kalender"},
    ]

    const pathname = usePathname()

    return (
        <nav className={styles.nav}>
                <Link href={"/"} className={styles.logo}>
                    <Image src={"/logo/bamblingen/logo-yellow-symbol.png"} alt="bambl2ngen logo" quality={50} width={48} height={48} />
                    <h3>Bamblingen</h3>
                </Link>
                <div className={styles.links}>
                        {links.map(link =>
                                <Link className={pathname === link.href ? styles.active : styles.inactive} key={link.href} href={link.href}>{link.display}</Link>
                            )}
                    {/* <Link href={"/dsib"}>Det skjer i Bamble</Link> */}
                </div>
            </nav>
    );
}