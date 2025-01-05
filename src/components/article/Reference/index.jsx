"use client"
import Image from "next/image";
import styles from "./style.module.css";
import Link from "next/link";
import Editor from "./editor"
import useFetch from "@/hooks/useFetch";

const config = {
    icon: "/icons/icon_article_reference.svg",
    name: "reference",
    renderer: ReferenceComponent,
    editor: Editor,
    previewText: (data) => {return data.title},
    default: {
      type: "reference",
      id: "testArticle"
    }
  }

export function ReferenceComponent ({id, title="*Referanse mangler*"}) {
    const url = `/api/v1/articles/${id}`
    const { data, error, loading } = useFetch(url)

    if (loading) {
        return <Link className={styles.c} href={`/n/${id}`}>
        <div className={styles.text}>
            <small>Les Også</small>
            <p className={styles.title}>Laster inn...</p>
        </div>
    </Link>
    }

    let v = data?.versions?.[0]

    return (
        <Link className={styles.c} href={`/n/${id}`}>
            <div className={styles.text}>
                <small>Les Også</small>
                <p className={styles.title}>{v?.title || id}</p>
            </div>
            <div className={styles.thumbnail}>
                <Image className={styles.overlay} src={"/icons/article_reference_overlay.svg"} alt="reference-overlay" width={360} height={720}/>
                <Image className={styles.img} src={v?.image || "/images/langesund.jpeg"} alt={v?.title || "alt-not-figured"} quality={75} width={240} height={120} />
            </div>
        </Link>
    );
}

export default config