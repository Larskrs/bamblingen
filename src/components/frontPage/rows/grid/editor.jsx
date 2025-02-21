"use client"
import TextArea from "@/components/editor/input/TextArea";
import styles from "./style.module.css"
import { useEffect, useState } from "react";
import Margin from "@/components/common/Margin";
import Switch from "@/components/editor/input/Switch";
import { FileExplorer } from "@/components/common/FileExplorer";
import Image from "next/image";
import FontSizeRange from "@/components/editor/input/FontSizeRange";
import GridLayoutSelector from "../../GridLayoutSelector.jsx";
import Expandable from "@/components/editor/input/Expandable";
import DraggableResort from "@/components/editor/input/DraggableResort";

export default function Editor ({ onChange=()=>{}, ...data}) {
    
    const [items, setItems] = useState(data.items)
    const [_layout, setLayout] = useState(data?.layout)

    const query = () => {
        return {
            type: "grid",
            layout: _layout,
            priority: "normal",
            items: items
        }
    }


    const UpdateItems = (index, newValue) => {
        console.log(newValue)
        const _ = [...items]
        _[index] = newValue
        setItems(_)
    }

    useEffect(() => {
        onChange(query())
    }, [items, _layout])

    return (
        <div className={styles.editor}>
            <GridLayoutSelector selected={_layout} onSelect={(layout) => setLayout(layout)} />
            <DraggableResort forceDraggable={false} items={items} onChange={(newOrder) => setItems(newOrder)} onRender={(item, i, isDragged) => {
                return (<>

                        <div className={styles.item}>
                            <Expandable title={item.title} className={styles.expandable} background={item.image} >
                                <ItemEditor key={i} {...item} onChange={(value)=>{UpdateItems(i, value)}} />
                            </Expandable>
                        </div>
                    </>
                )
            }}
            />
        </div>
    )

}




export function ItemEditor ({ onChange=()=>{}, ...data}) {

    const [_title, setTitle] = useState(data.title)
    const [_image, setImage] = useState(data?.image)
    const [_context, setContext] = useState(data.context)
    const [_isPriority, setIsPriority] = useState(data?.priority)
    const [_prefix, setPrefix] = useState(data.prefix)
    const [_prefixColor, setPrefixColor] = useState("var(--primary-500)")
    const [_backgroundColor, setBackgroundColor] = useState(data?.background)
    const [_hasPulse, setHasPulse] = useState(data?.pulse || false)
    const [_fontSize, setFontSize] = useState(data?.fontSize || 2.5)
    const [_imageLayout, setImageLayout] = useState(data?.imageLayout || "contain")

    const query = () => {
        return {
            type: "article",
            image: _image,
            pulse:      _hasPulse,
            prefix:      _prefix,
            prefixColor: _prefixColor,
            background: _isPriority ? "var(--secondary-25)" : "var(--white-900)",
            color:     !_isPriority ? "var(--secondary-25)" : "var(--white-900)",
            title: _title,
            priority: _isPriority,
            context: _context,
            fontSize: _fontSize,
            imageLayout: _imageLayout,
        }
    }

    useEffect(() => {
        onChange(query())
    }, [_title, _isPriority, _prefix, _hasPulse, _context, _image, _backgroundColor, _fontSize, _imageLayout])

    return (
        <div className={styles.editor}>
            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
            <h2 className={styles.seperator}>Bilde</h2>
            
            <FileExplorer onFileSelected={(f) => {setImage(`/api/v1/files?fileId=${f.id}`)}} >
                    <img className={styles.preview} src={_image} alt="bildeadresse"/>
            </FileExplorer>
            <Switch
                disabled={_image == ""}
                title={"Fyll bilderamme"}
                value={_imageLayout == "cover"}
                onChange={(v) => setImageLayout(v ? "cover" : "contain")}
            />
            <Margin.Block amount={0.25} />
            <button onClick={() => {setImage("")}} >Fjern Bilde</button>

            <Margin.Block amount={2} />
            <h2 className={styles.seperator}>Tekst</h2>

            <TextArea
                defaultValue={_title}
                placeholder="Titteltekst"
                onChange={(v) => setTitle(v)}
                description="Rediger bannertittel"
                />
            <TextArea
                defaultValue={_context}
                placeholder="Bakgrunn"
                onChange={(v) => setContext(v)}
                description="Rediger bakgrunn/kontekst"
                />
            <Margin.Block amount={0.25} />
            <FontSizeRange title={"Fontstørrelse"} value={_fontSize} onChange={(v) => {setFontSize(v)}} />

            <Margin.Block amount={2} />
            <h2 className={styles.seperator}>Prefiks</h2>

            <TextArea
                defaultValue={_prefix}
                placeholder="Prefix"
                onChange={(v) => setPrefix(v)}
                description="Rediger førtitteltekst"
                />
            <Margin.Block amount={0.25} />
            <Switch
                disabled={_prefix == ""}
                title={"Har pulseffekt"}
                value={_hasPulse}
                onChange={(v) => setHasPulse(v)}
                />
            
            <Margin.Block amount={2} />
            <h2 className={styles.seperator}>Andre Innstillinger</h2>

            <Switch
                title={"Prioritet"}
                value={_isPriority}
                onChange={(v) => setIsPriority(v)}
                />
        </div>
    );
}