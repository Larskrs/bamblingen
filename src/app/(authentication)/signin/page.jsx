import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"

export default async function SignInPage (props) {

    return (
        <div className={styles.c}>
            {/* <Image alt="" fill src={"http://aktuelt.tv/api/files?fileId=675c5320d222fb15c503bc6c"} /> */}
            <div className={styles.title}>
                <h1>Bli opplyst som flere </h1>
                <h1><span>bamblingær</span></h1>
            </div>

            {Object.values(providerMap).map((provider) => (
        <form key={provider.id}
          action={async () => {
            "use server"
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              })
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
              }
 
              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error
            }
          }}
        >
          <button type="submit">
            <span>Logg inn med</span>
            <Image alt="google_logo" src={"/logo/google_logo.png"} width={100} height={32} ></Image>
          </button>
        </form>
        ))}
        </div>
    )
}
