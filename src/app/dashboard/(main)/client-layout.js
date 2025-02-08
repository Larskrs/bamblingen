"use client";

import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import classNames from "classnames";
import useViewportSize from "@/hooks/useViewportSize";

export default function Layout({ links, session, children }) {

    const pathname = usePathname()
    const dimensions = useViewportSize()
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        console.log(innerWidth + " is the width")
        setCollapsed(window.innerWidth <= 900)
    }, [])

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed)
    }

return (
    <div className={classNames(styles.c, dimensions.width <= 900 ? styles.portrait : styles.landscape, collapsed ? styles.collapsed : styles.expanded)}>

        <nav className={classNames(styles.side, collapsed ? styles.collapsed : styles.expanded)}>

            <div className={classNames(styles.user, collapsed ? styles.collapsed : styles.expanded)}>
                    {!collapsed && <>
                <div className={styles.avatar}>
                    <Image
                        alt="user-avatar"
                        src={session.user.image}
                        width={128}
                        height={128}
                    />
                </div>
                    <div className={styles.col}>
                        <h3>{session.user.name}</h3>
                        <p>{session.user.role}</p>
                    </div>
                </>}
                    <div className={styles.toggle} onClick={handleCollapseToggle}>
                        <Image alt="toggle side icon" width={64} height={64} src={"/icons/symbol_side_switch.svg"} />
                    </div>
            </div>

            <div className={styles.links}>
                {links.map((l, i) =>
                    <NavItem collapsed={collapsed} key={l.href + i} l={l} pathname={pathname} i={i} />
                )}
            </div>
        </nav>

        <nav className={styles.nav}>
        </nav>

        <main className={styles.child}>
            {children}
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