import { LocalizeURL } from "@/lib/mediaLib";
import Image from "next/image";


export default function LocalImage (props) {

    let src = props.src
    src = LocalizeURL(src)

    return <Image src={src} {...props} />
}