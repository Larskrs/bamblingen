"use client"
import styles from "./style.module.css"
import Image from "next/image";
import { useState } from "react"

export default function CreateBatch ({onCreated=(id)=>{}}) {

    const [cooldown, setCooldown] = useState(false)
    
    async function handleCreateBatch () {

        if (cooldown) {
            return;
        }
        setCooldown(true)

        const formData = new FormData();
        formData.append('name', "new_batch")

        let res = null

        try {
            res = await fetch('/api/v1/files/batches', {
                method: 'POST',
                body: formData,
            });

        } catch (err) {
            return;
        }

        if (!res.ok) {
            return;
        }

        const json = await res.json()
        const batchId = json.data.id
        console.log(json)
        onCreated(batchId)
    }

    return (
        <div className={styles.btn} onClick={handleCreateBatch} >
            <div className={styles.icon}>
                <Image alt={"Create batch icon"} width={16} height={16} src={`/icons/icon_folder.svg`} />
            </div>
            <p>Lag Mappe</p>
        </div>
    );
}