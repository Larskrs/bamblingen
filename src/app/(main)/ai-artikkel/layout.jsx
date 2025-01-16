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
                <video alt="background-intro" className={styles.background} playsInline muted autoPlay loop src={"/api/files?fileId=1575c4b0_752d_456f_847a_5ca8cd960c52.mp4"} width={1920} height={1080} />
                <div className={styles.middle}>
                  <TypingEffect
                      typingSpeed={75}
                      pauseTime={2000}
                      prefix={"Lag en video av "}
                      prompts={["Levin som får kreftene til Spider-Man"]}
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
                      text={"Slikt som oss mennesker så bruker Ai assosiasjoner for å fylle tomrommet. . Når det du ber om noe til en Ai (Prompter) så bruker du dine assosiasjoner, men Ai bruker sine, da kan det oppstå en assosiasjonskonflikt"} />
                </div>
            </section>
            <section>
                <Image alt="background" className={styles.background} src={"http://aktuelt.tv/api/files?fileId=6788cd01d222fb15c503bc7c"} width={1920} height={1080} />
                <div className={styles.bottom}>
                  <TypingEffect
                      textStyle={{fontSize: "3rem", color: "var(--primary-500)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      prefix="Er prompting nok" prompts={["", "?"]}
                  />
                  <TextHighlight 
                      pauseTime={4000}
                      typingSpeed={5}
                      textStyle={{fontSize: "1.5rem", color: "var(--white-900)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      text={`Det var spørsmålet under saken: i 2023, da Kris Kashtanova's novelle brukte KI-genererte bilder. Originalt fikk hun fult copyright, men ble fratatt etter det ble visst at KI-en lagde bildet for henne. Ved sakens ende ble det bestemt, at prompting ikke påvirker resultatet nok, til at det kan bli sett på som et kunstnerisk verktøy.`} />
                </div>
            </section>
            <section>
                <Image alt="background" className={styles.background} src={"http://aktuelt.tv/api/files?fileId=67576551d222fb15c503bc52"} width={1920} height={1080} />
                <div className={styles.bottom}>
                  <TypingEffect
                      textStyle={{fontSize: "3rem", color: "var(--primary-500)", background: "var(--secondary-25)", fontFamily: "var(--font-domine)"}}
                      prefix="kild" prompts={["er", "e"]}
                  />
                  <Link href={"https://en.wikipedia.org/wiki/Prompt_engineering"} >Wikipedia - Prompt Engineering</Link>
                  <Link href={"https://snl.no/kunstig_intelligens"} >Store Norske Leksikon - Kunstig intelligens</Link>
                  <Link href={"https://snl.no/generativ_kunstig_intelligens"} >Store Norske Leksikon - Generativ kunstig intelligens</Link>
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
