import { useState } from "react"
import styles from "./style.module.css"

export default function DropDown ({items, description="", defaultValue="", onChange=()=>{}}) {

    const [expanded, setExpanded] = useState(false)
    const [current, setCurrent] = useState(defaultValue)
    const height = expanded ? `${items.length*2}em` : "2em"

    const findIndex = (i) => {
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            if (item.id == i) {
                return index
            }
        }
        console.log(i)
        return null
    }

    return (
        <>
            {description && <p className={styles.description}>{description}</p> }
            <div className={styles.c} style={{overflow: expanded ? "unset" : "hidden"}}>
                <div className={styles.items} style={{minHeight: height, maxHeight: height}} >
                    {items.map((item, index) => {
                        return <div onClick={() => {
                            if (expanded) {
                                setCurrent(item.id)
                                onChange(item.id)
                                setExpanded(false)
                            } else {
                                setExpanded(true)
                            }
                        }} key={item?.id} className={styles.button} style={{background: expanded ? "var(--secondary-75)" : "var(--secondary-200)"}}>
                            {expanded ? item.title : items[findIndex(current || defaultValue || items[0].id)].title }
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}