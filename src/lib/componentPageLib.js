
export const GridLayouts = [
    {
        id: "G_FULL",
        amount: 1,
    },
    {
        id: "G_1",
        amount: 1,
    },
    {
        id: "G_1_1",
        amount: 2,
    },
    {
        id: "G_1_2",
        amount: 2,
    },
    {
        id: "G_2_1",
        amount: 2,
    },
    {
        id: "G_1_1_1",
        amount: 2,
    }
]

export async function DefaultRows () {
    return (
        [
            {
                type: "banner",
                id: "V1StGXR8_Z5jdHi6Baef",
                article: "20250115-ef2b3a",
                background: "var(--secondary-25)",
                color: "white",
                priority: false,
                priorityPrefix: false,
                context: "Artikler er ikke redaksjonelle",
                title: `Denne nettavisen er ikke i drift!`,
                image: "https://bamblingen.no/api/v1/files?fileId=20250110-c8e464892340fcf52ead4c0eb810f8a5fad39c38abe58d06"
            },
            {
                    type: "grid",
                    layout: "G_FULL",
                    priority: "normal",
                    items: [
                        {
                            id: "V1StGXR8_Z5jdHi6Aaw",
                            type: "article",
                            priority: true,
                            background: "var(--secondary-25)",
                            color: "white",
                            priorityPrefix: true,
                            pulse: true,
                            fullImage: false,
                            context: "Bøytralist-partiet blir satt inn i med 100% av setene i stortinget",
                            title: "«Nå er det bare bøytralister her»",
                            image: "https://bamblingen.no/api/v1/files?fileId=20250110-c8e464892340fcf52ead4c0eb810f8a5fad39c38abe58d06",
                            fontSize: 3.5,
                        },
                    ],
                },
                
                {
                    type: "grid",
                    layout: "G_1_2",
                    priority: "none",
                    items: [
                        {
                            id: "V1StGXR8_Z5jdHi6A",
                            type: "article",
                            priority: false,
                            priorityPrefix: false,
                            fullImage: false,
                            context: "Langesund",
                            title: "Mangler artikkel",
                            image: "/images/langesund.jpeg",
                            fontSize: 2,
                        },
                        {
                            id: "V1StGXR8_Z5jdHi6Aaw",
                            type: "article",
                            priority: false,
                            priorityPrefix: false,
                            fullImage: false,
                            context: "Oppmøtet på langesund på 17.mai i 2023",
                            title: "«Mindre enn forventet»",
                            image: "https://bamblingen.no/api/v1/files?fileId=20250105-b217d32b83c1660f3835d7b399c2794fe93e6e34c22599d6"
                        },
                    ],
                },
                {
                    type: "banner",
                    id: "V1StGXR8_Z5jdHi6Baef",
                    article: "20250115-ef2b3a",
                    background: "var(--secondary-25)",
                    color: "white",
                    priority: true,
                    priorityPrefix: false,
                    context: "Artikler er ikke redaksjonelle",
                    title: `Denne nettavisen er ikke i drift!`,
                    image: "https://bamblingen.no/api/v1/files?fileId=20250110-c8e464892340fcf52ead4c0eb810f8a5fad39c38abe58d06"
                },
                {
                    type: "grid",
                    layout: "G_2_1",
                    priority: "none",
                    items: [
                        {
                            id: "V1StGXR8_Z5jdHi6A",
                            type: "video",
                            background: "var(--secondary-25)",
                            color: "white",
                            priority: true,
                            priorityPrefix: false,
                            fullImage: false,
                            context: "Skjærkøyveien, Ragn-Sells",
                            title: "Mangler Artikkel",
                            poster: "https://bamblingen.no/api/v1/files/video/thumbnail?v=20250214-27b37df91a4e4627",
                            video: "https://bamblingen.no/api/v1/files/video?v=20250214-27b37df91a4e4627"
                        },
                        {
                            id: "V1StGXR8_Z5jdHi6Aaw",
                            type: "article",
                            priority: true,
                            priorityPrefix: true,
                            background: "var(--secondary-25)",
                            color: "white",
                            fullImage: true,
                            context: "Oslo",
                            title: "Vil Carl finne kjærligheten i Oslo?",
                            image: "https://bamblingen.no/api/v1/files?fileId=20250103-d27c272bf4a1f1c3bcc96177ecf0cff6f9e71eb6c320ac79"
                        },
                    ],
                },
            ]
        )
}