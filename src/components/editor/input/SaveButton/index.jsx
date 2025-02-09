"use client"
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import Spinner from "@/components/details/spinner"

export default function SaveButton ({onClick, background="var(--secondary-500)", disabled=false, cooldownTime=250, showError=false, error=false, allowClickWithError=true, errorMessage={message: "Unknown Error"}, progress, children}) {

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
        return disabled && cooldown && (error && !allowClickWithError)
    }
    return (<>
            <div  onClick={(e) => {
                if (isDisabled()) { return; }
                onClick(e);
                setCooldown(true)
            }}
            className={styles.c}>

                <div className={styles.progress} style={{
                    width: `${_progressed()}%`, backgroundColor: error ? "var(--red-100)" : background
                    }}></div>
                <p style={{opacity: isDisabled() ? 0.25 : 1}}>
                    {_progressed() < 100 && <Spinner />}
                    <span>{children}</span>
                </p>
            </div>
            {showError && <pre style={{minHeight: error ? "fit-content" : "0px"}} className={styles.error}>{errorMessage?.message}</pre>}
    </>
    )
}