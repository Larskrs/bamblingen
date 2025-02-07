"use client";

import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useState } from "react";

export default function Layout({ links, session, children }) {

    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed)
    }

return (
    <div className={styles.c} style={{gridTemplateColumns: collapsed ? "3.75rem 1fr" : ""}}>
            <div className={styles.user}>
                <div className={styles.avatar}>
                    <Image
                        alt="user-avatar"
                        src={session.user.image}
                        width={128}
                        height={128}
                    />
                </div>
                {!collapsed && <>
                    <div className={styles.col}>
                        <h3>{session.user.name}</h3>
                        <p>{session.user.role}</p>
                    </div>
                    <div className={styles.toggle} onClick={handleCollapseToggle}>
                        <Image alt="toggle side icon" width={64} height={64} src={"/icons/symbol_side_switch.svg"} />
                    </div>
                </>}
            </div>
        <nav className={styles.side}>

        {links.map((l, i) =>
            <NavItem collapsed={collapsed} key={l.href + i} l={l} pathname={pathname} i={i} />
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


function NavItem ({collapsed, l,i, pathname}) {

            const { data, error, loading, loadMore } = useFetch(l.countAPI || "")

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
                    {!collapsed && <>
                        <p>{l.name}</p>
                        {l.countAPI && data != NaN && !loading && !error && <span className={styles.counter}>{data}</span>}
                    </>}
                </Link>
            )
}