"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import Batches from "./batches"
import Files from "./files"
import { Modal } from "./modal"

export function FileExplorer ({onFileSelected=()=>{}, children}) {

    const [batch, setBatch] = useState(null)
    const [open, setOpen] = useState(false)

        return (<>
            <div onClick={() => setOpen(true)}>{children}</div>
            {open && <Modal>
                <div className={styles.c}>

                    {!batch && <Batches onOpenBatch={(id) => setBatch(id)}/>}
                    {batch && <Files batch={batch} onFileSelect={onFileSelected} />}

                </div>
                <nav className={styles.nav}>
                    <button onClick={() => {setBatch(null); if (batch==null) {setOpen(false)}}} className={styles.button}>Tilbake</button>
                </nav>
            </Modal>}
        </>)

    function ListRenderer ({}) {

        if (!batch) {
            return <Batches onOpenBatch={(id) => setBatch(id)}/>
        }

        return <Files batch={batch} onFileSelect={onFileSelected} />
    }
}