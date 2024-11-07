import Link from "next/link";
import styles from "./nav.module.css"
import Image from "next/image";

export default function Navigation () {
    return (
        <nav className={styles.nav}>
                <Link href={"/"} className={styles.logo}>
                    <Image src={"/logo/bamblingen/logo-yellow-symbol.png"} alt="bambl2ngen logo" quality={50} width={48} height={48} />
                    <h3>Bamblingen</h3>
                </Link>

                <div className={styles.links}>
                    <Link href={"/nyheter"}>Nyheter</Link>
                    <Link href={"/meninger"}>Meninger</Link>
                    <Link href={"/tips"}>Tips oss</Link>
                    <Link href={"/abboner"}>Bli abbonent</Link>
                </div>
            </nav>
    );
}