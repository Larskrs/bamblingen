"use server";

import Image from "next/image";
import styles from "./layout.module.css";
import Link from "next/link";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Client from "./client-layout"

export default async function Layout({ children }) {
  const session = await auth();

  if (!session) {
    return notFound();
  }

  let links = [
    {
      href: "/",
      name: "Forside",
      icon: "/logo/logo.svg",
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

  if (["ADMIN", "DIRECTOR"].includes(session.user.role)) {
    links = [...links, ...[
        {
            href: "/dashboard/verifications",
            name: "Søknadder",
            icon: "/icons/icon_verifications.svg",
            countAPI: "/api/v1/articles/verifications/count?status=PENDING"
        },
        {
            href: "/dashboard/frontpage",
            name: "Rediger Forsiden",
            icon: "/icons/icon_article.svg",
        }
      ]
    ]
  }

  return (
    <Client links={links} session={session}>{children}</Client>
  );
}
