import Pulse from "@/components/details/pulse";
import styles from "./style.module.css"

import RenderItems from "./items"

export default function Grid ({items, layout, group, ...props}) {

    // Render the component with the remaining props
    if (group) {
        return <GroupedRow {...group}>
            <Row layout={layout} items={items} {...props} />
        </GroupedRow>
    }
    return <Row layout={layout} items={items} {...props} />;

    function Row ({layout, items, ...props}) {
        return <>
            <div className={`${styles.row} ${styles[layout]}`}>
                <RenderItems items={items} {...props} />
            </div>
        </>
    }
    function GroupedRow ({title, priority, context="", priorityPrefix=false, background, foreground, children}) {
        return (
            <>
                <div style={{borderColor: foreground, background: background}} className={`${styles.group} ${styles[priority]}`}>
                    <h1 className={styles.title}>
                        { priorityPrefix && <span className={styles.latest}>
                            <Pulse color={foreground && foreground} />
                            <span style={{color: foreground}}>SISTE:</span>
                        </span> }
                        {title}
                    </h1>
                    <p className={styles.context}>
                        {context}
                    </p>
                    {children}
                </div>
            </>
        )
    }
}