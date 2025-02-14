import { LocalizeURL } from "@/lib/mediaLib";
import Image from "next/image";


export default function LocalImage ({src, ...props}) {

    let _src = src
    _src = LocalizeURL(_src)

    console.log("Localized Image, in LocalImage Component: " + _src)

    return <Image src={_src} {...props} />
}