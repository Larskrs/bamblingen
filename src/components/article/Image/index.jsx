import Image from "next/image";
import styles from "./style.module.css"
import ZoomableElement from "@/components/wrappers/ZoomInWrapper";
import Editor from "./editor"

export default function TextComponent ({id, src, alt, credit, editor, onChange=()=>{}}) {

    if (editor) {
        return <Editor id={id} src={src} alt={alt} credit={credit} onChange={onChange}/>
    }

    return (
        <div className={styles.c}>
            <Image className={styles.img} src={src} alt={alt} width={500} height={500} />
            <div>
            <p className={styles.alt}>{alt}</p>
            <p className={styles.credit}>{credit}</p>
            </div>
        </div>
    );
}

