"use server"
import { auth } from "@/auth";
import ClientLayout from "./page"
import Link from "next/link";
import Navigation from "@/components/layout/PrimaryNavigation/nav";
import Cookies from "@/components/layout/Cookies";


export default async function MainLayout ({children}) {

    const session = await auth()

    return (
        <>
            {session && <div style={{background: "var(--secondary-25)", color: "white", padding: "0.25rem 1rem"}}>
            Hei {session.user.name}, <Link style={{color: "var(--primary-500)"}} href={"/dashboard"}>åpne skrivesenteret</Link>
            </div>}

            <Navigation />
            <Cookies policyId={"0.0.1"} />

            {children}
        </>
    );
}