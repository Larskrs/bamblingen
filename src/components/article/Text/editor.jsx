"use client"
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";
import Editor from "./editor"
import MarkdownFormatter from "@/components/common/MarkdownText";
import TextArea from "@/components/editor/input/TextArea";
import DraggableResort from "@/components/editor/input/DraggableResort";

export default function TextComponent({
    id,
    lines = ["ERROR!!", "Noice", "Text Component Missing Lines Property"],
    editor,
    onChange=()=>{}
}) {    

    const [current, setCurrent] = useState(-1)

    const [_lines, setLines] = useState(lines)

    const Select = (index) => {
        setCurrent(index)
        if (_lines[current] === "") {
            DeleteLine(current)
        }
    }

    const query = () => {

        return {
            type: "text",
            lines: _lines
        }
    }

    useEffect(() => {
        onChange(query())
    }, [_lines])

    const UpdateLine = (index, newValue) => {

        const _ = [..._lines]
        _[index] = newValue
        setLines(_)
    }
    const DeleteLine = (index) => {
        const _ = _lines.filter((_, i) => i !== index);
        setLines(_)
    }
    const AddLine = () => {
        setLines([..._lines, `Ny linje (${_lines.length + 1})`])
        Select(_lines.length)
    }

    const SubmitLine = (e) => {
        AddLine()
        setCurrent(current + 1)
    }

    return (
        <div className={styles.c}>
            {/* <DraggableResort items={_lines} onChange={(newOrder) => setLines(newOrder)} onRender={(item, index) => {
                if (current === index) {
                    return <LineEditor key={index} id={i} line={_lines[index]} onSubmit={SubmitLine} onUpdate={(v) => {UpdateLine(i, v)}} onDelete={DeleteLine}/>
                }
                return (<div key={index+"edit"} style={{color: "white"}} className={styles.line} onClick={() => {Select(i)}}>
                            <MarkdownFormatter key={index+_lines[index]} text={_lines[index]} />
                        </div>)
                
            }} ></DraggableResort> */}
            {_lines.map((line, i) => {
                if (current === i) {
                    return <LineEditor key={i} id={i} line={line} onSubmit={SubmitLine} onUpdate={(v) => {UpdateLine(i, v)}} onDelete={DeleteLine}/>
                }
                return (<div  key={i+"edit"} style={{color: "white"}} className={styles.line} onClick={() => {Select(i)}}>
                            <MarkdownFormatter key={i+line} text={line} />
                        </div>)
            })}
            <div onClick={AddLine} className={styles.createLine}>Legg til linje</div>
        </div>
    );

}
function LineEditor ({line, id, onUpdate, onDelete, onSubmit}) {

    return (
        <div className={styles.editor}>
            <TextArea focus={true} placeholder="Ny linje" defaultValue={line} description="" className={styles.editing} onEnter={onSubmit} onChange={onUpdate}></TextArea>
            <button onClick={() => onDelete(id)}>Slett Linje</button>
        </div>
    )
}




