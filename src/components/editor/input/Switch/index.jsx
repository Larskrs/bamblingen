import classNames from "classnames";
import styles from "./styles.module.css"

export default function Switch ({value=false, onChange=()=>{}, title, disabled=false}) {

    const handleToggle = () => {
        if (disabled) { return; }
        onChange(!value)
    }

    return (
        <div
            style={{opacity: disabled ? 0.5 : 1}}
            className={classNames(value ? styles.active : styles.inactive,styles.c)}
            onClick={handleToggle}
            >
            <p>{title}</p>
            <div className={classNames(value ? styles.active : styles.inactive, styles.s)}>
                <span className={classNames(value ? styles.active : styles.inactive, styles.dot)}></span>
            </div>
        </div>
    );
}