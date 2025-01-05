import Image from "next/image";
import styles from "./page.module.css";
import { redirect } from "next/navigation"
import { signIn, auth, providerMap } from "@/auth"
import { AuthError } from "next-auth"

export default async function SignInPage (props) {

    return (
        <div className={styles.c}>
            <div className={styles.body}>
              <div className={styles.column}>

              
              <h1 className={styles.title}>Log inn</h1>
              <p>Nettsiden er ikke enda i drift</p>

              {/* <div className={styles.title}>
                  <h1>Bli opplyst som flere </h1>
                  <h1><span>bamblingær</span></h1>
                </div> */}

              {Object.values(providerMap).map((provider) => (
                <form key={provider.id}
                action={async () => {
                  "use server"
                  try {
                    await signIn(provider.id, {
                      redirectTo: "/",
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
                      <Image alt="google_logo" src={"/logo/google_logo_icon.png"} width={64} height={64} ></Image>
                      <span>Logg inn med {provider.name}</span>
                    </button>
                  </form>
              ))}
            </div>
          </div>
          <div className={styles.image}><Image alt="" fill src={"https://bamblingen.no/api/v1/files?fileId=20250103-d27c272bf4a1f1c3bcc96177ecf0cff6f9e71eb6c320ac79"} /></div>
        </div>
    )
}
