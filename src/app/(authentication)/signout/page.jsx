import Image from "next/image";
import styles from "./page.module.css";
import { signOut } from "@/auth"

export default async function SignOutPage() {

    return (
        <div className={styles.c}>
            {/* <Image alt="" fill src={"http://aktuelt.tv/api/files?fileId=67335d341d55014bbbb5dcf3"} /> */}
            <h1>Sikker på at du vil forlate oss?</h1>
            <form
                action={async () => {
                    "use server"
                    await signOut({redirectTo: "/"})
                }}
            >
                <button type="submit">Sign Out</button>
            </form>
        </div>
    )
}
