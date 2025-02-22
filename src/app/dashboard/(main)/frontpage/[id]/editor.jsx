"use client"
import ComponentPage from "@/components/frontPage/ComponentPage"
import styles from "./editor.module.css";
import TextArea from "@/components/editor/input/TextArea";
import SaveButton from "@/components/editor/input/SaveButton";
import DraggableResort from "@/components/editor/input/DraggableResort";
import { ArticleComponents, ArticleRenderer, GetArticleComponent, GetComponentPreviewText } from "@/components/article/ArticleContent";
import Expandable from "@/components/editor/input/Expandable";
import CategoryInput from "@/components/editor/input/CategoryInput"
import GridIconSelector from "@/components/editor/input/GridIconSelector";
import DropDown from "@/components/editor/input/DropDown";
import ImageEditor from "@/components/article/Image/editor"

import { useState } from "react";
import FrontPageRow, { GetRow } from "@/components/frontPage/rows";

export default function NewsArticlePage ({ pageId, userId, defaultRows }) {

    const [ rows, setRows ] = useState(defaultRows)
    const [editingIndex, setEditingIndex] = useState(null)

    const UpdateRows = (line, newValue) => {
        const _ = [...rows]
        _[line] = newValue
        setRows(_)
    }
    const SetRows = (newRows) => {
        setRows(newRows)
    }
    const SetEditingIndex = (i) => {
        if (editingIndex == i) { SetEditingIndex(null); return; }
        setEditingIndex(i)
    }

    return (
        <div className={styles.c}>
            <nav className={styles.nav}>
                <div className={styles.navContent}>
                    <RowList rows={rows} editingIndex={editingIndex} SetEditingIndex={SetEditingIndex} UpdateRows={UpdateRows} SetRows={SetRows} />
                </div>
            </nav>
            <div className={styles.main}>
                <ComponentPage rows={rows} />
            </div>
        </div>
    )

    
}
function RowList ({rows, SetEditingIndex, editingIndex, UpdateRows=()=>{}, SetRows=()=>{}}) {
    return (
        <div className={styles.rows}>
            <DraggableResort disabled={editingIndex !== null} forceDraggable={false} items={rows} onChange={(newOrder) => SetRows(newOrder)} onRender={(item, i, isDragged) => {
                const config = GetRow(item)?.config(item)

                return (
                        <Expandable onToggle={() => {SetEditingIndex(i)}} mode="FORCE" forceExpanded={editingIndex === i} key={i} title={config.title} icon={config.icon} className={styles.rowItem}>
                            <FrontPageRow isEditor={true} rows={[item]} onRowUpdate={(index, newValue) => UpdateRows(i, newValue)} />
                        </Expandable>
                )
            }}
            />
        </div>
    )
}