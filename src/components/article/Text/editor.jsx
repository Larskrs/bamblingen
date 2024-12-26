"use client"
import styles from "./style.module.css"
import React, { useState } from "react";
import Editor from "./editor"
import MarkdownFormatter from "@/components/common/MarkdownText";

export default function TextComponent({
    id,
    lines = ["ERROR!!", "Noice", "Text Component Missing Lines Property"],
    editor
}) {    

    const [current, setCurrent] = useState(-1)

    const [_lines, setLines] = useState(lines)
    console.log(_lines)

    const UpdateLine = (index, newValue) => {
        const _ = [..._lines]
        _[index] = newValue
        setLines(_)
    }
    const DeleteLine = (index) => {
        const _ = _lines.filter((_, i) => i !== index);
        setLines(_)
    }

    return (
        <div className={styles.c}>
            {_lines.map((line, i) => {
                if (current === i) {
                    return <LineEditor key={i} id={i} line={line} onChange={(v) => {UpdateLine(i, v)}} onDelete={DeleteLine}/>
                }
                return (<div key={i} onClick={() => {setCurrent(i)}}>
                            <MarkdownFormatter className={styles.line} key={i+line} text={line} />
                        </div>)
            })}
            <div onClick={() => {setLines([..._lines, `Ny linje (${_lines.length})`])}} className={styles.createLine}>Legg til linje</div>
        </div>
    );
}

function LineEditor ({line, id, onChange, onDelete}) {

    const [value, setValue] = useState(line)

    const handleInput = (e) => {
        setValue(e.target.value); // Update the state with the new text content
        onChange(e.target.value)
    };

    return (
        <div className={styles.editor}>
            <textarea className={styles.editing} value={value} onChange={handleInput}></textarea>
            <button onClick={() => onDelete(id)}>Slett Linje</button>
        </div>
    )
}



