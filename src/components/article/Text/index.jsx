import styles from "./style.module.css"
import React from "react";
import Editor from "./editor"
import Link from "next/link";
import MarkdownFormatter from "@/components/common/MarkdownText";


const PreviewText = (data) => {
  let txt = ""
  if (data.lines?.length > 0) {
    if (!data?.lines?.[0]) {
      txt = "(tomt)"
    }
    let t = data.lines[0].substring(0,48)
    if (data.lines[0].length > 48) {
      txt = t + "..."
    }
    txt = t
  } else {
    txt = "(tomt tekstfelt)"
  }
  if (txt == "") {
    txt = "(tomt tekstfelt)"
  }
  return txt + ` (${data.lines.length})`
}

const config = {
  icon: "/icons/icon_text.svg",
  name: "tekstfelt",
  description: "Tekstfelt som støtter markdown-formatet",
  renderer: TextComponent,
  editor: Editor,
  previewText: PreviewText,
  previewBackground: (data) => { return null },
  default: {
    type: "text",
    lines: [""]
  }
}

export function TextComponent({
    id,
    lines = [],
    editor,
    onChange
}) {


    if (editor) {
      return <Editor id={id} lines={lines} onChange={onChange}/>
    }
    return (
        <div className={styles.c}>
            {lines.map((line, index) => {
                return (<MarkdownFormatter key={index+line} id={index+line} text={line} />)
            })}
        </div>
    );
}

export default config