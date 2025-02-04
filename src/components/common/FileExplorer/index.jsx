"use client"
import Link from "next/link"
import styles from "./style.module.css"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import Batches from "./batches"
import Files from "./files"
import { Modal } from "./modal"
import SelectedView from "./selected"

export function FileExplorer ({onFileSelected=()=>{}, children, modal=true}) {

    const [batch, setBatch] = useState(null)
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState()

    const handleFileSelection = (file) => {
        setSelected(file)
        onFileSelected(file)
        // `/api/v1/files?fileId=${f.id}`
    }

    if (modal == false) {
        return (<>
                <nav className={styles.nav}>
                    <button onClick={() => {setBatch(null); if (batch==null) {setOpen(false)}}} className={styles.button}>Tilbake</button>
                    <p>{batch}</p>
                </nav>
                <div className={styles.c}>

                    {!batch && <Batches onOpenBatch={(id) => setBatch(id)}/>}
                    {batch && <Files batch={batch} onFileSelect={handleFileSelection} />}

                </div>
            </>)
    }

        return (<>
            <div className={styles.selector} onClick={() => setOpen(true)}>
                <span>Trykk her for å endre fil</span>
                {children}
            </div>
            {open && <Modal onClose={() => setOpen(false)}>
                <nav className={styles.nav}>
                    <button onClick={() => {setBatch(null); if (batch==null) {setOpen(false)}}} className={styles.button}>Tilbake</button>
                </nav>
                <div className={styles.c}>

                    <div className={styles.list}>

                        {!batch && <Batches onOpenBatch={(id) => setBatch(id)}/>}
                        {batch && <Files batch={batch} onFileSelect={handleFileSelection} />}

                    </div>
                    <SelectedView file={selected} />
                </div>
            </Modal>}
        </>)

    function ListRenderer ({}) {

        if (!batch) {
            return <Batches onOpenBatch={(id) => setBatch(id)}/>
        }

        return <Files batch={batch} onFileSelect={handleFileSelection} />
    }
}