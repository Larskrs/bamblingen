import Image from "next/image";


export default function LocalImage (props) {

    let src = props.src
    if (process.env.NEXT_PUBLIC_URL.startsWith("https://bamblingen.no")) {
        src = src.split("https://bamblingen.no").pop()
    }

    return <Image src={src} {...props} />
}