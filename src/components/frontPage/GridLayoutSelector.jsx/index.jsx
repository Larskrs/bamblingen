import { GridLayouts } from "@/lib/componentPageLib";
import styles from "./style.module.css"
import Image from "next/image";
import classNames from "classnames";

export default function GridLayoutSelector ({selected, onSelect=()=>{}}) {
    
    return (
        <div className={styles.c}>
            {GridLayouts.map((layout, i) => {
                return (
                    <div onClick={() => {onSelect(layout.id)}} className={classNames(selected == layout.id ? styles.active : styles.layout)} key={layout.id}>
                        <Image src={`/icons/grid_${layout.id.split("G_").pop()}.svg`} width={64} height={64} alt={`layout_${layout.id}`} />
                    </div>
                )
            })}
        </div>
    );
}