"use server"
import { GetArticle } from "@/lib/articleLib"
import Client from "./client"
export default async function Page ({params}) {

    const parm = await params
    const id = parm.id

    const article = await GetArticle(id)

    if (!article) {
        return notFound()
    }

    const v = article?.versions?.[0]
    const components = v.components


    return (
        <div>
            <Client article={article} version={v} />
        </div>
    );
}

export async function generateMetadata({ params }) {

    const parm = await params
    const id = parm.id

    const article = await GetArticle(id)

    const v = article?.versions[0]

    if (!article) {
        return {
            title: "Ukjent Artikkel"
        }
    }

    const title = `${v.title} - Bamblingen.no - Nyheter fra Bamble`
    const subtitle = v.subtitle

    return {
      title: title,
      description: subtitle,
      openGraph: {
        title: title,
        description: subtitle,
        siteName: "Bamblingen.no",
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: subtitle,
        images: [`${process.env.EXTERNAL_URL}${v.image}`]
      }
    }
  }