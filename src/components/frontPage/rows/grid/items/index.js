import Article from "./article"
import Video from "./video"
import Image from "./image"


const itemMap = {
    "article": Article,
    "video": Video,
    "image": Image,
}

export default function RenderRowItems ({items}) {

    return (
        <>
            {items.map((item, i) => {
                // Select the appropriate component based on the type
                const Item = itemMap[item.type];
                if (!Item) return null; // If type is unsupported, skip

                return (
                        <Item key={i} {...item} />
                )
            })}
        </>
    )
}