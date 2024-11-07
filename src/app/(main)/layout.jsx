import Link from "next/link";
import styles from "./layout.module.css"
import Image from "next/image";
import Navigation from "../components/layout/PrimaryNavigation/nav";

export default function MainLayout ({children}) {
    return (
        <>
            <Navigation />
            {children}
        </>
    );
}