"use client"

import Image from "next/image";
import styles from "./page.module.css";
import useFetch from "@/hooks/useFetch";

export default function News () {

    const { data, error, loading } = useFetch("/api/v1/articles")

    console.log("Fetch: ", data, error, loading)
    return (
        <>
            { loading && <h1>Loading...</h1> }
            { error && <h1>{error}</h1> }
        </>
    )
}