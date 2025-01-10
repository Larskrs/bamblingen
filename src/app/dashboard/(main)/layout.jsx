"use server";

import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  const links = [
    {
      href: "/dashboard/",
      name: "Kontrollpanel",
      icon: "/logo/bamblingen/logo-yellow-symbol.png",
    },
    {
      href: "/dashboard/article",
      name: "Innhold",
      icon: "/icons/icon_articles.svg",
    },
    {
      href: "/dashboard/batches",
      name: "Filmaterialer",
      icon: "/icons/icon_folder.svg",
    },
  ];

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

        {links.map((l, i) => (
          <Link key={l.href + i} className={styles.link} href={l.href}>
            <Image
              alt={`link-icon-${l.name.toLowerCase()}`}
              src={l.icon}
              width={128}
              height={128}
            />
            <p>{l.name}</p>
          </Link>
        ))}
      </nav>

      <main>
        <div className={styles.child}>
        {children}
        </div>
      </main>
    </div>
  );
}
