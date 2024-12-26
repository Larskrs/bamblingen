"use client"
import styles from "./style.module.css"
import React, { useState } from "react";
import Editor from "./editor"
import MarkdownFormatter from "@/components/common/MarkdownText";
import TextArea from "@/components/common/input/TextArea";

export default function TextComponent({
    id,
    lines = ["ERROR!!", "Noice", "Text Component Missing Lines Property"],
    editor
}) {    

    const [current, setCurrent] = useState(-1)

    const [_lines, setLines] = useState(lines)
    console.log(_lines)

    const Select = (index) => {
        setCurrent(index)
        if (_lines[current] === "") {
            DeleteLine(current)
        }
    }

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
            <p className={styles.details}>Lines: {_lines.length}</p>
            {_lines.map((line, i) => {
                if (current === i) {
                    return <LineEditor key={i} id={i} line={line} onSubmit={SubmitLine} onChange={(v) => {UpdateLine(i, v)}} onDelete={DeleteLine}/>
                }
                return (<div className={styles.line} key={i} onClick={() => {Select(i)}}>
                            <MarkdownFormatter key={i+line} text={line} />
                        </div>)
            })}
            <div onClick={AddLine} className={styles.createLine}>Legg til linje</div>
        </div>
    );

}
function LineEditor ({line, id, onChange, onDelete, onSubmit}) {

    const [value, setValue] = useState(line)

    const handleInput = (e) => {
        setValue(e.target.value); // Update the state with the new text content
        onChange(e.target.value)
    };

    return (
        <div className={styles.editor}>
            <TextArea className={styles.editing} onEnter={onSubmit} defaultValue={value} onChange={handleInput}></TextArea>
            <button onClick={() => onDelete(id)}>Slett Linje</button>
        </div>
    )
}




