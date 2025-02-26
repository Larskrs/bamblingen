"use client"
import Image from "next/image";
import styles from "./editor.module.css";
import { useEffect, useState } from "react"
import TextArea from "@/components/editor/input/TextArea";
import Visualizer from "@/app/(main)/(default)/news/[id]/client"
import SaveButton from "@/components/editor/input/SaveButton";
import DraggableResort from "@/components/editor/input/DraggableResort";
import ArticleContent, { ArticleComponents, ArticleRenderer, GetArticleComponent, GetComponentPreviewBackground, GetComponentPreviewText } from "@/components/article/ArticleContent";
import Expandable from "@/components/editor/input/Expandable";
import CategoryInput from "@/components/editor/input/CategoryInput"
import GridIconSelector from "@/components/editor/input/GridIconSelector";
import { useRouter } from "next/navigation";
import DropDown from "@/components/editor/input/DropDown";
import { FileExplorer } from "@/components/common/FileExplorer";
import ImageEditor from "@/components/article/Image/editor"
import Margin from "@/components/common/Margin";
import Switch from "@/components/editor/input/Switch";

export default function NewsArticlePage ({ articleId, userId, defaultArticle }) {
    
    const v = defaultArticle.versions?.[0]

    const isCreating = articleId === 'new'

    const [title, setTitle] = useState(v.title)
    const [subTitle, setSubTitle] = useState(v.subtitle)
    const [image, setImage] = useState(v.image)
    const [components, setComponents] = useState(v.components)
    const [article, setArticle] = useState(defaultArticle)
    const [authors, setAuthors] = useState(defaultArticle.authors)
    const [categories, setCategories] = useState(["Ingen", "Kategorier"])
    const [type, setType] = useState()

    const [uploaded, setUploaded] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const router = useRouter()

    const query = () => {
        return {
            title: title,
            subtitle: subTitle,
            authors: authors.map((a) => a.id),
            image,
            components,
            categories: categories.map((c) => c),
            id: defaultArticle.id,
            type: type || article.type,
        }
    }
    const visualizerQuery = () => {
      return {
        article: {
          id: defaultArticle.id,
          type: type || article.type,
          authors: authors,
          categories: categories.map((c) =>  {return { name: c, id: c}}),
        },
        version: {
          title: title,
          subtitle: subTitle,
          image,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          components,
        },
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
          setUploaded(json)
          return json

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
            setErrorMessage(json.error)
            setError(true)
            setLoading(false)
          }

          const json = await res.json()
          setUploaded(json)
          return json

        } catch (error) {

        } finally {
            
        }
      };

      useEffect(() => {
        if (!isCreating) { return; }
        if (uploaded?.id) {
          router.push(`/dashboard/article/${uploaded.id}`)
          router.refresh()
        }
      }, [uploaded])

      const handleSubmit = async () => {
        if (isCreating) {
            return await handleCreate()
        } else {
            return await handleUpdate()
        }
      }
      const handleSubmitAndVerify = async () => {
          const article = await handleUpdate()
          const version = article?.versions?.[0]
          console.log(version.id)
          const q = {
            id: version.id
          }

          try {

            const res = await fetch(`/api/v1/articles/verifications`, {
              method: 'POST',
              body: JSON.stringify(q),
            });

            if (!res.ok) {
            const json = await res.json()
            setErrorMessage(json.error)
            setError(true)
            setLoading(false)
          }
        } catch (err) {
          setErrorMessage(err.message)
          setError(true)
          setLoading(false)
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

      const articleTypes = [
        {title: "Nyhetsartikkel", id: "NEWS"},
        {title: "Mening", id: "OPINION"},
        {title: "Kommentar", id: "COMMENT"},
        {title: "Arrangement", id: "ADVERTISEMENT"},
        ]

    return (
        <div className={styles.c}>
            <nav className={styles.nav}>
                <div className={styles.navContent}>

                    <div className={styles.top}>
                        <SaveButton onClick={handleSubmit} background="var(--white-100)" error={error} errorMessage={{message: errorMessage}} disabled={loading} progress={loading ? 0 : 100}>
                          {isCreating ? "Lag ny artikkel" : "Lagre utkast"}
                        </SaveButton>
                        {!isCreating && <SaveButton onClick={handleSubmitAndVerify} error={error} errorMessage={{message: errorMessage}} disabled={loading} progress={loading ? 0 : 100}>
                          {"Send"}
                        </SaveButton>}
                    </div>

                    <Margin.Block amount={1} />

                    <DropDown items={articleTypes} defaultValue={type || article.type} description={"Artikkeltype"} onChange={(v) => {setType(v)}}></DropDown>
                    <Margin.Block amount={1} />
                    <TextArea placeholder={"Overskrift"} description={"Skriv inn overskriften på artikkelen."} onChange={(v) => setTitle(v)} defaultValue={v.title}></TextArea>
                    <TextArea placeholder={"Undertittel"} description={"Skiv inn undertittelen her"} onChange={setSubTitle} defaultValue={v.subtitle}></TextArea>
                    <Margin.Block amount={1} />
                    
                    <CategoryInput description="" onChange={(value) => setCategories(value)} defaultCategories={article.categories}/>
                    <Margin.Block amount={1} />

                    <Expandable icon={"/icons/icon_file_image.svg"} title={"Bilde"}>
                        <ImageEditor src={v.image} onChange={(value) => setImage(value.src)} />
                        {/* return <Editor id={id} src={src} alt={alt} credit={credit} onChange={onChange}/> */}
                        {/* <TextArea placeholder={"Bildeaddresse"} description={"Skiv inn undertittelen her"} onEnter={(value) => setImage(value)} defaultValue={v.image}></TextArea> */}
                    </Expandable>
                    
                    <Margin.Block amount={1} />
                    <h2>Innhold</h2>

                    <DraggableResort items={components} onChange={(newOrder) => setComponents(newOrder)} onRender={(item, index, isDragged) => {
                        return (<div style={isDragged ? {background: "var(--secondary-100)"} : {background: "var(--secondary-200)"}} className={styles.component}>
                            <Expandable draggable background={GetComponentPreviewBackground(components[index])} icon={GetArticleComponent(item.type).icon} key={index} title={GetComponentPreviewText(components[index])}>
                                <ArticleRenderer editor components={[components[index]]} onUpdateComponent={(line, newValue) => UpdateComponents(index, newValue)} />
                            </Expandable>
                        </div>)
                    }} />

                    <GridIconSelector onChange={AddComponent} items={ArticleComponents} />
                    <div className={styles.bottomSpace} />
                </div>
                <pre className={styles.error}>{errorMessage}</pre>
                <div className={styles.navBar}>
                    <SaveButton onClick={handleSubmit} background="var(--white-100)" error={error} errorMessage={{message: errorMessage}} disabled={loading} progress={loading ? 0 : 100}>
                      {isCreating ? "Lag ny artikkel" : "Lagre utkast"}
                    </SaveButton>
                    {!isCreating && <SaveButton onClick={handleSubmitAndVerify} error={error} errorMessage={{message: errorMessage}} disabled={loading} progress={loading ? 0 : 100}>
                      {"Send"}
                    </SaveButton>}
                </div>
            </nav>
            <div className={styles.main}>
                <Visualizer {...visualizerQuery()} />
            </div>
        </div>

    )


}