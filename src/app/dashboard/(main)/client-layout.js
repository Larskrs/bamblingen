"use client";

import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";

export default function Layout({ links, session, children }) {

    const pathname = usePathname()

return (
    <div className={styles.c}>
        <nav>
            <div className={styles.user}>
                <Image
                    alt="user-avatar"
                    src={session.user.image}
                    width={1080}
                    height={1080}
                />
            </div>

        {links.map((l, i) => 
            <NavItem key={l.href + i} l={l} i={i} />
        )}
        </nav>

        <main>
            <div className={styles.child}>
                {children}
            </div>
        </main>
    </div>
    );
}


function NavItem ({l,i}) {

            const { data, error, loading, loadMore } = useFetch(l.countAPI)

            let isActive = false
            const noDashPrefix = (n) => n.split("/dashboard").pop()

            if (noDashPrefix(pathname).startsWith(`${noDashPrefix(l.href)}`)) {
                isActive = true
            }
            if (l.href.endsWith("/dashboard/")) { isActive = false }

            return (
                <Link className={`${styles.link} ${isActive ? styles.active : styles.inactive}`} href={l.href}>
                    <Image
                        alt={`link-icon-${l.name.toLowerCase()}`}
                        src={l.icon}
                        width={128}
                        height={128}
                        />
                    <p>{l.name}</p>
                    {l.countAPI && data && <span className={styles.counter}>{data}</span>}
                </Link>
            )
}