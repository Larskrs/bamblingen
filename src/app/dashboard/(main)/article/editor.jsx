"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { formatRelativeDate } from "@/lib/timeLib";
import axios, { AxiosRequestConfig } from 'axios';
import { notFound } from "next/navigation";
import { GetArticle, DefaultArticle } from "@/lib/articleLib";
import ArticleContent from "@/components/article/ArticleContent";
import ArticleImage from "@/components/article/Image"
import { useEffect, useState } from "react"
import TextArea from "@/components/common/input/TextArea";

export default function NewsArticlePage ({ userId, defaultArticle }) {
    
    const v = defaultArticle.versions?.[0]

    const [title, setTitle] = useState(v.title)
    const [subTitle, setSubTitle] = useState(v.subtitle)
    const [image, setImage] = useState(v.image)
    const [components, setComponents] = useState(v.components)
    const [article, setArticle] = useState(defaultArticle)
    const [authors, setAuthors] = useState([userId])

    
    const query = () => {
        const _ = {
            title: title,
            subtitle: subTitle,
            authors,
            image,
            components
        }
        return _
    }

    const UpdateComponents = (line, newValue) => {
        console.log("Updating components")
        console.log({newValue})
        const _ = [...components]
        _[line] = newValue
        setComponents(_)
    }

    const handleUpload = async () => {
    
        try {
          const res = await fetch('/api/v1/articles', {
            method: 'POST',
            body: JSON.stringify(query()),
          });
    
          if (!res.ok) {
            const json = await res.json()
            throw new Error('Upload failed: ' + json.message);
          }
    
          const json = await res.json()

        } catch (error) {
          
        } finally {
            
        }
      };
    

    return (
        <div className={styles.c}>
            <div className={styles.article}>
            <div className={styles.context}>
                {article.categories.map((tag) => {
                    return (  
                        <p key={tag.id}>{tag.name}</p>
                    )
                })}
            </div>
                <header className={styles.header}>
                    <h1><TextArea onChange={(v) => setTitle(v)} defaultValue={v.title}></TextArea></h1>
                    <p><TextArea onChange={setSubTitle} defaultValue={v.subtitle}></TextArea></p>
                </header>
                <div className={styles["lead"]}>
                    <div className={styles["lead-media"]}>
                        <ArticleImage onChange={(e) => {setImage(e.src)}} editor={true} alt="lead-media" src={image} width={1280} height={720} />
                    </div>
                    <div className={styles.sidebar}>
                        <div className={styles.authors}>
                            {article.authors.map((author) => {
                                return (
                                    <div key={author} className={styles.author}>
                                        {article.authors.length < 3 && <Image alt={`${author.name}'s image`} src={author.image} height={128} width={128}/>}
                                        <div className={styles.body}>
                                            <p>{author.name}</p>
                                            <p>{author.title || "Journalist"}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {/* <p className={styles.date}>Sist oppdatert {formatRelativeDate(new Date(article.createdAt))}</p> */}
                    </div>
                </div>
                <div className={styles.m}>
                    {/* <p>Article for {await id}</p> */}
                    <div className={styles.body}>
                        <ArticleContent editor={true} components={components} onUpdateComponent={UpdateComponents}/>
                    </div>
                </div>
            </div>
            <pre>{JSON.stringify(query(), null, 2)}</pre>

            <button onClick={handleUpload}>Skap Artikkel</button>
        </div>

    )


}