"use client"
import styles from "./style.module.css"
import Image from "next/image";

export default function CreateBatch ({}) {



    async function handleCreateBatch () {
        const formData = new FormData();

        try {
            const res = await fetch('/api/v1/files', {
                method: 'POST',
                body: formData,
            });

        } catch (err) {

        }
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