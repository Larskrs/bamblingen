"use client"
import Image from "next/image";
import styles from "./page.module.css";
import FullPageVerticalSnap from "@/components/wrappers/FullPageVerticalSnap"
import TextHighlight from "@/components/common/TextHighlight/page";
import TypingEffect from "@/components/common/TypingEffect";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function AI({
}) {

  return (
    <main className={styles.c}>
      <div className={styles.wrapper}>
        <FullPageVerticalSnap LitColor="var(--primary-500)" UnLitColor="var(--primary-500)">
            <section>
                <Image alt="background-intro" className={styles.background} src={"http://aktuelt.tv/api/files?fileId=67595593d222fb15c503bc67"} width={1920} height={1080} />
                <div className={styles.middle}>
                  <TypingEffect prompts={["Ai Prompting", "Ai Prompting"]} textStyle={{fontSize: "4rem", color: "var(--primary-500)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}} />
                  <TextHighlight center={true} text={"Gjør alt det du vil på få tastetrykk"} />
                </div>
            </section>
            <section>
                <video alt="background-intro" className={styles.image} playsInline muted autoPlay loop src={"http://aktuelt.tv/api/files?fileId=6759d637d222fb15c503bc69"} width={1920} height={1080} />
                <div className={styles.middle}>
                  <TypingEffect
                      typingSpeed={75}
                      pauseTime={2000}
                      prefix={"Lag en video av "}
                      prompts={["Hilde når noen bruker Photoshop til vektorgrafikk."]}
                      textStyle={{
                        fontSize: "2rem",
                        color: "var(--white-900)",
                        background: "var(--secondary-25)",
                        fontFamily: "var(--font-inter)",
                        borderRadius: "1rem",
                        padding: ".25em .5em",
                        width: "90vw",
                        maxWidth: "100%",
                        boxShadow: "0px 0px 10px var(--secondary-25)"
                      }} />
                  {/* <TextHighlight
                      center={true}
                      text={"Gjør alt det du vil på få tastetrykk"}
                      itemStyle={{
                          fontSize: "1.5rem"
                      }}
                  /> */}
                </div>
            </section>
            <section>
                <Image alt="background" className={styles.background} src={"http://aktuelt.tv/api/files?fileId=67576551d222fb15c503bc52"} width={1920} height={1080} />
                <div className={styles.bottom}>
                  <TypingEffect 
                      textStyle={{fontSize: "3rem", color: "var(--primary-500)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      prompts={["Assosiasjoner", ""]}
                  />
                  <TextHighlight 
                      pauseTime={4000}
                      typingSpeed={5}
                      textStyle={{fontSize: "1.5rem", color: "var(--white-900)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      text={"Slikt som oss mennesker så bruker Ai assosiasjoner for å skape. Når det du ber om noe til en Ai (Prompter) så bruker du dine assosiasjoner, men Ai bruker sine, da kan det oppstå en assosiasjonskonflikt"} />
                </div>
            </section>
            <section>
                <Image alt="background-intro" className={styles.image} src={"http://aktuelt.tv/api/files?fileId=675957d7d222fb15c503bc68"} width={1920} height={1080} />
                <div className={styles.bottom}>
                  <TypingEffect 
                      textStyle={{fontSize: "3rem", color: "var(--primary-500)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      prompts={["Assosiasjoner", ""]}
                  />
                  <TextHighlight 
                      pauseTime={4000}
                      typingSpeed={5}
                      textStyle={{fontSize: "1.5rem", color: "var(--white-900)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      text={"Slikt som oss mennesker så bruker Ai assosiasjoner for å skape. Når det du ber om noe til en Ai (Prompter) så bruker du dine assosiasjoner, men Ai bruker sine, da kan det oppstå en assosiasjonskonflikt"} />
                </div>
            </section>

        </FullPageVerticalSnap>
      </div>
      <nav className={styles.nav}>
        <Link href={"/"}>
          <Image alt="logo-link" src={"/logo/white_logo.png"} width={64} height={64} />
        </Link>
      </nav>
    </main>
  );
}
