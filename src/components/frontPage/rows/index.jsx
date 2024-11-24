import Pulse from "@/components/details/pulse";
import styles from "./style.module.css"

import RenderItems from "../items"

export default function FrontPageRow ({rows}) {


    return (
        <>
            {rows.map(({ layout, group, items, ...props }, i) => {

                // Render the component with the remaining props
                if (group) {
                    return <GroupedRow key={i} {...group} {...props}>
                        <Row key={i} id={i} layout={layout} items={items} {...props} />
                    </GroupedRow>
                }

                return <Row key={i} id={i} layout={layout} items={items} {...props} />;
            })}
        </>
    );

    function Row ({layout, items, ...props}) {
        return <>
            <div className={`${styles.row} ${layout}`}>
                <RenderItems items={items} {...props} />
            </div>
        </>
    }
    function GroupedRow ({title, priority, children}) {
        return (
            <>
                <div className={`${styles.group} ${styles[priority]}`}>
                    <h1 className={styles.title}>
                        { priority == "priority" && <span className={styles.latest}>
                            <Pulse />
                            <span>SISTE:</span>
                        </span> }
                        {title}
                    </h1>
                    {children}
                </div>
            </>
        )
    }
}