"use client"
import { useEffect, useState } from "react"
import styles from "./index.module.css"

export default function SaveButton ({onClick, disabled=false, cooldownTime=250, error=false, allowClickWithError=true, errorMessage={message: "Unknown Error"}, progress, children}) {

    const [cooldown, setCooldown] = useState(false)

    useEffect(() => {
        if (cooldown) {
            const timer = setTimeout(() => {
              setCooldown(false);
            }, cooldownTime); // 1000ms = 1 sekund
      
            // Rydd opp timeren hvis komponenten unmountes eller isUpdated endres før timeren fullføres
            return () => clearTimeout(timer);
          }
    }, [disabled, cooldown])

    const _progressed = () => {
        if (cooldown) {
            return 0;
        }
        return progress
    }
    const isDisabled = () => {
        return disabled || cooldown || (error && !allowClickWithError)
    }
    return (<>
            <div  onClick={(e) => {
                if (isDisabled()) { return; }
                onClick(e);
                setCooldown(true)
            }}
            className={styles.c}>

                <div className={styles.progress} style={{
                    width: `${_progressed()}%`, backgroundColor: error ? "var(--red-100)" : "var(--secondary-500)"
                    }}></div>
                <p style={{opacity: isDisabled() ? 0.25 : 1}}>{children}</p>
            </div>
            <p style={{minHeight: error ? "fit-content" : "0px"}} className={styles.error}>{errorMessage?.message}</p>
    </>
    )
}