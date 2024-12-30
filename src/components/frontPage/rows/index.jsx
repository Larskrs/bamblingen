import Pulse from "@/components/details/pulse";
import styles from "./style.module.css"

import Grid from "./grid";
import Header from "./header";
import Banner from "./banner";
import Countdown from "./countdown"

export default function FrontPageRow ({rows}) {

    const rowMap = {
        "grid": Grid,
        "header": Header,
        "banner": Banner,
        "countdown": Countdown
    };

        return (
            <div className={styles.c}>
                {rows.map((row, i) => {
                    // Select the appropriate component based on the type
                    const Row = rowMap[row.type];
                    if (!Row) return null; // If type is unsupported, skip

                    return (
                            <Row key={i} {...row} />
                    )
                })}
            </div>
        )
    }
