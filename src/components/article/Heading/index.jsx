import Image from "next/image";
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper";
import Editor from "./editor"

const config = {
    icon: "/icons/icon_heading.svg",
    renderer: HeadingComponent,
    name: "overskrift",
    previewText: (data) => {return data.alt || data.src},
    editor: Editor,
    default: {
        type: "heading",
        text: "",
        level: 2,
    }
}

export function HeadingComponent ({id, text, level=0, onChange=()=>{}}) {

    return (
        <div className={styles.c}>
            <h1 className={styles[`h${level}`]}>{text}</h1>
        </div>
    );
}

export default config
