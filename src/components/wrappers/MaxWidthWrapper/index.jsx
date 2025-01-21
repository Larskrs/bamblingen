import styles from "./style.module.css"

export default function MaxWidthWrapper ({
    children,
}) {
    return (
        <div className={styles.maxWidth}>
            {children}
        </div>
    )
}