import styles from "./style.module.css"
import React from "react";
import Editor from "./editor"
import Link from "next/link";
import MarkdownFormatter from "@/components/common/MarkdownText";


const PreviewText = (data) => {
  if (data.lines?.length > 0) {
    if (!data?.lines?.[0]) {
      return "(tomt)"
    }
    let t = data.lines[0].substring(0,48)
    if (data.lines[0].length > 48) {
      return t + "..."
    }
    return t
  } else {
    return "(tomt)"
  }
}

const config = {
  icon: "/icons/icon_text.svg",
  name: "tekstfelt",
  renderer: TextComponent,
  editor: Editor,
  previewText: PreviewText,
  default: {
    type: "text",
    lines: ["Hei, dette er et nytt tekstobjekt"]
  }
}

export function TextComponent({
    id,
    lines = ["ERROR!!", "Noice", "Text Component Missing Lines Property"],
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