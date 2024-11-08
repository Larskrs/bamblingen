import styles from "./style.module.css";

export default function HeaderComponent({ level = 1, headingText = "", lowerHeadingText = "" }) {
    const levels = {
        1: <h1 className={styles.heading}>{headingText}</h1>,
        2: <h2 className={styles.heading}>{headingText}</h2>,
        3: <h3 className={styles.heading}>{headingText}</h3>,
        4: <h4 className={styles.heading}>{headingText}</h4>,
        5: <h5 className={styles.heading}>{headingText}</h5>,
        6: <h6 className={styles.heading}>{headingText}</h6>,
    };

    return (
        <div className={styles.headerComponent}>
            {levels[level]}
            {lowerHeadingText && <p className={styles.lowerHeading}>{lowerHeadingText}</p>}
        </div>
    );
}
