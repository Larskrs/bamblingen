import styles from "./style.module.css"

export default function FlowNumber ({number}) {
        const digits = [0,1,2,3,4,5,6,7,8,9]

    return (
        <div className={styles.flow}>
            <div className={styles.shifter} style={{translate: `0px ${number}em`}}>
                {digits.map((d) => <span style={{bottom: `${d-1}em`}}>{d}</span>)}
            </div>
        </div>
    )
}