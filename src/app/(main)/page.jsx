"use server"
import { auth } from "@/auth";
import ClientLayout from "./client"
import Link from "next/link";
import { DefaultRows } from "@/lib/componentPageLib";


export default async function MainLayout ({children}) {

    const session = await auth()

    const rows = await DefaultRows()

    return (
        <>
            {session && <div style={{background: "var(--secondary-25)", color: "white", padding: "0.25rem 1rem"}}>
            Hei {session.user.name}, <Link style={{color: "var(--primary-500)"}} href={"/dashboard"}>åpne skrivesenteret</Link>
            </div>}

            <ClientLayout rows={rows}/>
        </>
    );
}