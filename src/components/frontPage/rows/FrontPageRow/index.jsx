import Pulse from "@/components/details/pulse";
import DoubleGrid from "../double";
import FullGrid from "../full";
import TripleGrid from "../triple";
import styles from "./style.module.css"

export default function FrontPageRow ({rows}) {

    const rowMap = {
        full: FullGrid,
        double: DoubleGrid,
        triple: TripleGrid
    };

    return (
        <>
            {rows.map(({ type, group, ...props }, i) => {
                // Select the appropriate component based on the type
                const Row = rowMap[type];
                if (!Row) return null; // If type is unsupported, skip

                // Render the component with the remaining props
                if (group) {
                    return <GroupedRow {...group}><Row key={i} {...props} /></GroupedRow>
                }

                return <Row key={i} {...props} />;
            })}
        </>
    );




    function GroupedRow ({title, children}) {
        return (
            <>
                <div className={`${styles.row} ${styles.priority} gap-16`}>
                    <h1 className="row gap-16">
                        {title}
                    </h1>
                    {children}
                </div>
            </>
        )
    }
}