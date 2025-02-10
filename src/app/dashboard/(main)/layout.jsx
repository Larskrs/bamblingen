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

  const links = [
    {
      href: "/dashboard/",
      name: "Kontrollpanel",
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
    {
      href: "/dashboard/verifications",
      name: "Søknadder",
      icon: "/icons/icon_verifications.svg",
      countAPI: "/api/v1/articles/verifications/count?status=PENDING"
    },
  ];

  return (
    <Client links={links} session={session}>{children}</Client>
  );
}
