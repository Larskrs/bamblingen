import Pulse from "@/components/details/pulse";
import styles from "./style.module.css"

import Grid from "./grid";
import Header from "./header";
import NewsBanner from "./banner";

export const rowMap = {
    "grid": Grid,
    "header": Header,
    "banner": NewsBanner,
};

export default function FrontPageRow ({rows, isEditor, onRowUpdate}) {

        return (
            <div className={styles.c}>
                {rows.map((row, i) => {
                    // Select the appropriate component based on the type
                    const Row = rowMap[row.type];
                    
                    if (!Row) return null; // If type is unsupported, skip
                    
                    if (isEditor) {
                        const Editor = Row.Editor
                        return (
                            <Editor key={i} {...row} onChange={(value) => onRowUpdate(i, value)} />
                        )
                    }
                    
                    const Page = Row.Page
                    return (
                        <Page key={i} {...row} />
                    )
                })}
            </div>
        )
}

export function GetRow (row) {
    const Row = rowMap[row.type];
    return { config: Row.config }
}