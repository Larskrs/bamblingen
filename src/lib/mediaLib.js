

export function LocalizeURL(url) {
    let src = url
    if (process.env.NEXT_PUBLIC_URL.includes("https://bamblingen.no")) {
        src = src.split("https://bamblingen.no").pop()
    }
    return src
}