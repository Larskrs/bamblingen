"use client"
import { useSession } from "next-auth/react"
import styles from "./style.module.css"
import Image from "next/image"
import Link from "next/link"
 
export default function Dashboard() {
  const { data: session } = useSession()
 
  if (session?.user?.name) {

    return <div className={styles.c}>
      <p>{session?.user?.name}</p>
      <Image width={32} height={32} src={session?.user?.image}></Image>
    </div>
    
  }
 
  return <div className={styles.c}>
    <Link href={"/api/auth/signin"}>Logg inn</Link>
  </div>
}