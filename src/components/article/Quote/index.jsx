import Image from "next/image";
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper";
import Editor from "./editor"

const config = {
    icon: "/icons/icon_quote.svg",
    renderer: QuoteComponent,
    name: "sitat med innrykk",
    description: "Sitat med innrykk",
    previewText: (data) => {return data.text || "(sitat)"},
    editor: Editor,
    default: {
        type: "quote",
        text: "",
        author: "",
    }
}

export function QuoteComponent ({id, text, author, onChange=()=>{}}) {

    return (
        <div className={styles.c}>
            <p className={styles.quote}>
                <span className={styles.TL} ><Image src={"/icons/quote_symbol.svg"} width={32} height={32} /></span>
                <span className={styles.text}>{text}</span>
                <span className={styles.BR} ><Image src={"/icons/quote_symbol.svg"} width={32} height={32} /></span>
            </p>
            {author && <p className={styles.author}>- {author}</p>}
        </div>
    );
}

export default config
