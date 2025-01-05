"use client"
import Image from "next/image";
import styles from "./editor.module.css";
import { useEffect, useState } from "react"
import TextArea from "@/components/editor/input/TextArea";
import Visualizer from "./visualizer"
import SaveButton from "@/components/editor/input/SaveButton";
import DraggableResort from "@/components/editor/input/DraggableResort";
import ArticleContent, { ArticleComponents, ArticleRenderer, GetArticleComponent, GetComponentPreviewText } from "@/components/article/ArticleContent";
import Expandable from "@/components/editor/input/Expandable";
import GridIconSelector from "@/components/editor/input/GridIconSelector";

export default function NewsArticlePage ({ articleId, userId, defaultArticle }) {
    
    const v = defaultArticle.versions?.[0]

    const [title, setTitle] = useState(v.title)
    const [subTitle, setSubTitle] = useState(v.subtitle)
    const [image, setImage] = useState(v.image)
    const [components, setComponents] = useState(v.components)
    const [article, setArticle] = useState(defaultArticle)
    const [authors, setAuthors] = useState(defaultArticle.authors)
    const [categories, setCategories] = useState(["Ingen", "Kategorier"])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    
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
    const visualizerQuery = () => {
      return {
        title: title,
        subtitle: subTitle,
        authors: authors,
        image,
        components,
        categories: categories,
        id: defaultArticle.id
      }
    }

    const UpdateComponents = (line, newValue) => {
        const _ = [...components]
        _[line] = newValue
        setComponents(_)
    }

    const handleUpdate = async () => {
        setLoading(true)
        setError(false)

        const q = query()

        try {
          const res = await fetch(`/api/v1/articles/${article.id}`, {
            method: 'PUT',
            body: JSON.stringify(q),
          });

          if (!res.ok) {
            const json = await res.json()
            setErrorMessage(json.error)
            setError(true)
            setLoading(false)
          }

          const json = await res.json()

        } catch (error) {

        } finally {
          setLoading(false)
        }
      };
    const handleCreate = async () => {

        const q = query()

        setLoading(true)
        setError(false)

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


        } catch (error) {
          setErrorMessage(error)
          setError(true)
          setLoading(false)
        } finally {
          setLoading(false)
        }
      };

      const handleSubmit = async () => {
        if (articleId=="new") {
            await handleCreate()
        } else {
            await handleUpdate()
        }
      }

      const AddComponent = (type) => {
          const component = GetArticleComponent(type)
          setComponents([...components, component.default])
      }
      const RemoveComponent = (index) => {
          let _ = [...components]
          _ = _.filter((c, i) => index != i)
          setComponents(_)
      }

    return (
        <div className={styles.c}>
            <nav className={styles.nav}>
                <TextArea placeholder={"Overskrift"} description={"Skriv inn overskriften på artikkelen."} onChange={(v) => setTitle(v)} defaultValue={v.title}></TextArea>
                <TextArea placeholder={"Undertittel"} description={"Skiv inn undertittelen her"} onChange={setSubTitle} defaultValue={v.subtitle}></TextArea>

                <Expandable icon={"/icons/icon_file_image.svg"} title={"Ledende Bilde"}>
                    <TextArea placeholder={"Bildeaddresse"} description={"Skiv inn undertittelen her"} onEnter={(value) => setImage(value)} defaultValue={v.image}></TextArea>
                </Expandable>
                <h2>Innhold</h2>

                <DraggableResort items={components} onChange={(newOrder) => setComponents(newOrder)} onRender={(item, index, isDragged) => {
                    return (<div style={isDragged ? {background: "var(--secondary-100)"} : {background: "var(--secondary-200)"}} className={styles.component}>
                        <Expandable icon={GetArticleComponent(item.type).icon} key={index} title={GetComponentPreviewText(components[index])}>
                            <ArticleRenderer editor components={[components[index]]} onUpdateComponent={(line, newValue) => UpdateComponents(index, newValue)} />
                            <button className={styles.delete} onClick={() => RemoveComponent(index)}>Fjern objekt</button>
                        </Expandable>
                    </div>)
                }} />

                <GridIconSelector onChange={AddComponent} items={ArticleComponents} />

                <SaveButton onClick={handleSubmit} error={error} errorMessage={{message: errorMessage}} disabled={loading} progress={loading ? 0 : 100}>{"Lagre"}</SaveButton>
            </nav>
            <div className={styles.main}>
                <Visualizer query={visualizerQuery()} />
            </div>
        </div>

    )


}