import classNames from "classnames";
import styles from "./styles.module.css";
import { useState } from "react";

export default function FontSizeRange({ value = 1, onChange = () => {}, title, disabled = false }) {
    
    const [inputValue, setInputValue] = useState(value.toString());

    function addWithPrecision(a, b, precision = 5) {
        let sum = a + b;
        let factor = Math.pow(10, precision);
        return Math.round(sum * factor) / factor;
    }

    const handleSetValue = () => {
        const parsedValue = parseFloat(inputValue);
        if (!isNaN(parsedValue)) {
            onChange(parsedValue);
        } else {
            setInputValue(value.toString()); // Reset to current value if invalid
        }
    };

    const handleAddValue = (v) => {
        const newValue = addWithPrecision(value, v);
        onChange(newValue);
        setInputValue(newValue.toString());
    };

    return (
        <div style={{ opacity: disabled ? 0.5 : 1 }} className={classNames(value ? styles.active : styles.inactive, styles.c)}>
            <p>{title}</p>
            <div className={styles.s}>
                <div onClick={() => handleAddValue(-0.05)} className={styles.m}>-</div>
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSetValue();
                            e.preventDefault();
                        }
                    }}
                    className={styles.v}
                />
                <div onClick={() => handleAddValue(0.05)} className={styles.m}>+</div>
            </div>
        </div>
    );
}
