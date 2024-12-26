"use server"
import { auth } from "@/auth";
import ClientLayout from "./clientLayout"
import Link from "next/link";


export default async function MainLayout ({children}) {

    const session = await auth()

    return (
        <>
            {session && <div style={{background: "var(--secondary-100)", color: "white", padding: "0.25rem"}}>
            Du er logget inn som {session.user.name}, <Link style={{color: "var(--primary-500)"}} href={"/dashboard"}>åpne skrivesenteret</Link>
            </div>}

            <ClientLayout>
                {children}
            </ClientLayout>
        </>
    );
}