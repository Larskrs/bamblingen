import styles from "./style.module.css"

export default function TextComponent({ id, lines = ["ERROR!!", "Noice", "Text Component Missing Lines Property"] }) {
    return (
        <div className={styles.c}>
            {lines.map((line, index) => (
                <p key={index}>{line}</p>
            ))}
        </div>
    );
}
