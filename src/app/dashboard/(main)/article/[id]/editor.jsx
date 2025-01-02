"use client"
import Image from "next/image";
import styles from "./editor.module.css";
import { useEffect, useState } from "react"
import TextArea from "@/components/editor/input/TextArea";
import Visualizer from "./visualizer"
import SaveButton from "@/components/editor/input/SaveButton";
import DraggableResort from "@/components/editor/input/DraggableResort";
import ArticleContent from "@/components/article/ArticleContent";
import Expandable from "@/components/editor/input/Expandable";

export default function NewsArticlePage ({ articleId, userId, defaultArticle }) {
    
    const v = defaultArticle.versions?.[0]

    console.log(v)

    const [title, setTitle] = useState(v.title)
    const [subTitle, setSubTitle] = useState(v.subtitle)
    const [image, setImage] = useState(v.image)
    const [components, setComponents] = useState(v.components)
    const [article, setArticle] = useState(defaultArticle)
    const [authors, setAuthors] = useState(defaultArticle.authors)
    const [categories, setCategories] = useState(["Ingen", "Kategorier"])

    const [loading, setLoading] = useState(false)

    
    const query = () => {
        return {
            title: title,
            subtitle: subTitle,
            authors: authors.map((a) => a.id),
            image,
            components,
            categories: categories,
            id: defaultArticle.id
        }
    }

    const UpdateComponents = (line, newValue) => {
        console.log("Updating components")
        console.log({newValue})
        const _ = [...components]
        _[line] = newValue
        setComponents(_)
    }

    const handleUpdate = async () => {
        
        const q = query()
        console.log(q)

        try {
          const res = await fetch(`/api/v1/articles/${article.id}`, {
            method: 'PUT',
            body: JSON.stringify(q),
          });
    
          if (!res.ok) {
            const json = await res.json()
            throw new Error('Upload failed: ' + json.message);
          }
    
          const json = await res.json()
          console.log(json)

        } catch (error) {
          
        } finally {
            
        }
      };
    const handleCreate = async () => {
        
        const q = query()
        console.log(q)

        try {
          const res = await fetch(`/api/v1/articles/`, {
            method: 'POST',
            body: JSON.stringify(q),
          });
    
          if (!res.ok) {
            const json = await res.json()
            throw new Error('Upload failed: ' + json.message);
          }
    
          const json = await res.json()
          console.log(json)

        } catch (error) {
          
        } finally {
            
        }
      };

      const handleSubmit = async () => {
        if (articleId=="new") {
            await handleCreate()
        } else {
            await handleUpdate()
        }
      }

    return (
        <div className={styles.c}>
            <nav className={styles.nav}>
                <TextArea placeholder={"Overskrift"} description={"Skriv inn overskriften på artikkelen."} onChange={(v) => setTitle(v)} defaultValue={v.title}></TextArea>
                <TextArea placeholder={"Undertittel"} description={"Skiv inn undertittelen her"} onChange={setSubTitle} defaultValue={v.subtitle}></TextArea>

                <Expandable title={"Ledende Bilde"}>
                    <TextArea placeholder={"Bildeaddresse"} description={"Skiv inn undertittelen her"} onEnter={(value) => setImage(value)} defaultValue={v.image}></TextArea>
                </Expandable> 
                <h2>Innhold</h2>

                <DraggableResort items={components} onChange={(newOrder) => setComponents(newOrder)} onRender={(item, index, isDragged) => {
                    return (<div style={isDragged ? {background: "var(--secondary-100)"} : {background: "var(--secondary-200)"}} className={styles.component}>
                        <Expandable key={index} title={item.type}>
                            <ArticleContent editor components={[components[index]]} onUpdateComponent={(line, newValue) => UpdateComponents(index, newValue)} />
                        </Expandable> 
                    </div>)
                }} />

                <SaveButton onClick={handleSubmit} progress={100}>{"Lagre"}</SaveButton>
            </nav>
            <div className={styles.main}>
                <Visualizer query={query()} />
            </div>
        </div>

    )


}