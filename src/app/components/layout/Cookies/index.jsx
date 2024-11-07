"use client"
import { useEffect, useState } from "react"
import styles from "./style.module.css"
import Link from "next/link"

export default function Cookies({children, policyId}) {

    const [isSeen, setSeen] = useState(0)
    const [isAccepted, setAccepted] = useState(false)
    useEffect(() => {
      if (typeof window !== "undefined") {
        if (isSeen === 0) {
          setSeen(localStorage.getItem("cookie_policy_accepted"))
        }
      }
    }, [isSeen])

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cookie_policy_accepted") == policyId) {
        return <></>
      }
    } else {
      return (<></>)
    }


    // When user submits the form, save the favorite number to the local storage
    const saveToLocalStorage = e => {
      setSeen(true)

      setTimeout(() => {
        localStorage.setItem("cookie_policy_accepted", policyId)
      }, 1000)

      setSeen(policyId)
    }

    return (
      <div className={`${styles.container} ${isSeen == policyId ? styles.accepted : ""}`}>
      <div className={styles.holder}>
          <div className={styles.notice}>
            <h3>Bruk av informasjonskapsler</h3>
            <p>Vi bruker essensielle informasjonskapsler for å drifte nettstedet. For å fortsette å bruke <b>bamblingen.no</b> må du godta disse nødvendige informasjonskapsler.</p>
          </div>

        <div className={styles.row}>
            <Link href={"/policy/cookies"}>Les mer</Link>
            <button onClick={saveToLocalStorage} className={styles.button} type="submit" >Godta</button>
        </div>
      </div>
      </div>
    )

}
