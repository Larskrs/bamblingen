import { useState } from "react"
import styles from "./style.module.css"
import classNames from "classnames"

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
        return null
    }

    return (
        <div className={styles.row}>
            {description && <p className={styles.description}>{description}</p> }
            <div className={classNames(styles.c, expanded ? styles.expanded : styles.condensed)}>
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
                        }} key={item?.id} className={classNames(styles.button, expanded ? styles.expanded : styles.condensed)}>
                            {expanded ? item.title : items[findIndex(current || defaultValue || items[0].id)].title }
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}