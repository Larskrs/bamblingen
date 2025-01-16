import styles from "./style.module.css"
import FlowNumber from "../FlowNumberDigit"

export default function InfiniteFlowNumber ({number}) {

    const s = number.toString()
    const digits = s.split("")

    return (
        <div className={styles.digits}>
            {digits.map((d) => <FlowNumber key={d} number={parseInt(d)} />)}
        </div>
    )
}