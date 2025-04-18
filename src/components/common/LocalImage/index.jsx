import { LocalizeURL } from "@/lib/mediaLib";
import Image from "next/image";


export default function LocalImage ({src, ...props}) {

    let _src = src
    _src = LocalizeURL(_src)

    return <Image src={_src} {...props} />
}