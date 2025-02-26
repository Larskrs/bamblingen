
import crypto from "crypto"
import slugify from "slugify";
import { db } from "./db";
import { GetUser } from "./userLib";


/**
 * Sluggify the title to create a URL-friendly slug.
 * @param {string} title - The title to sluggify.
 * @returns {string} - The sluggified title.
 */
function sluggifyTitle(title) {
    return slugify(title, {
        lower: true,    // Convert to lowercase
        strict: true,   // Remove special characters like apostrophes
    });
}


/**
 * Generate a unique identifier for a news item based on the creation date.
 * @param {Date} creationDate - The creation date of the news item.
 * @returns {Promise<string>} - The unique identifier (e.g., 20241216-a1b2c3).
 */

export async function GenerateUniqueIdentifier(creationDate) {
        const formattedDate = creationDate.toISOString().slice(0, 10);
        const datePart = formattedDate.replace(/-/g, ''); // YYYYMMDD format
        let uniqueIdentifier;

        // Retry mechanism in case of collisions
        while (true) {
            const randomPart = crypto.randomBytes(3).toString('hex'); // 6-character random string
            uniqueIdentifier = `${datePart}-${randomPart}`;

            // Check if the identifier is unique in the database
            const existingItem = await db.article.findUnique({
                where: {
                    createdAt: {
                        gte: new Date(`${formattedDate}T00:00:00Z`), // Start of the day
                        lt: new Date(`${formattedDate}T23:59:59Z`), // End of the day
                    },
                    id: uniqueIdentifier
                },
            });

            if (!existingItem) {
                break; // Exit the loop if the identifier is unique
            }
        }

        return uniqueIdentifier;
    }


    export const MAX_PER_PAGE = 20



export async function GetArticle (id) {

    if (!id) {
        return Error("No Article_id provided to GetArticle Function");
    }

    try {
            // Dynamically build the query based on optional parameters
            const query = {
                include: {
                    authors: true,
                    categories: true,
                    versions: {
                        take: 1,
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
                where: {
                    id: id
                }, // Initialize an empty `where` object
            };
    
            // Fetch data from the database with the constructed query
            const data = await db.article.findUnique(query);

            data.versions.map((v) => {
                const _ = v
                _.components = JSON.parse(_.components)
                return _
            })
    
            return data
        } catch (err) {
            return {
                    message: "Could not retrieve articles due to an error",
                    error: err.message || err,
                }
        }

}
export const ConnectOrCreateCategoryTags = (_tags) => _tags.map((tagName) => ({
    where: { id: tagName.toLowerCase() },
    create: {
        name: tagName,
        id: tagName.toLowerCase(),
        description: `Kategori for ${tagName}`,
    },
}));

export const articleTypes = [
    {
        id: "NEWS",
        name: "Nyheter",
        color: "var(--secondary-500)",
    },
    {
        id: "OPINION",
        name: "Mening",
        color: "var(--orange-500)",
    },
    {
        id: "COMMENT",
        name: "Kommentar",
        color: "var(--red-500)",
    },
    {
        id: "ADVERTISEMENT",
        name: "Arrangement",
        color: "var(--secondary-100)",
    }
]
export const verificationStatuses = [
    {
        id: "PENDING",
        name: "Ikke vurdert",
        color: "var(--white-100)"
    },
    {
        id: "PROCESSING",
        name: "Vurderes",
        color: "var(--orange-500)"
    },
    {
        id: "DENIED",
        name: "Avslått",
        color: "var(--red-500)"
    },
    {
        id: "ACCEPTED",
        name: "Godkjent",
        color: "var(--secondary-500)"
    },
    {
        id: "POSTPONED",
        name: "Satt på vent",
        color: "var(--white-100)"
    },
]
export function GetType (id) {
    for (let i = 0; i < articleTypes.length; i++) {
        const t = articleTypes[i];
        if (t.id === id) {
            return t
        }
    }
    return articleTypes[0]
}
export function GetVerificationStatus (id) {
    for (let i = 0; i < verificationStatuses.length; i++) {
        const t = verificationStatuses[i];
        if (t.id === id) {
            return t
        }
    }
    return verificationStatuses[0]
}

export async function DefaultArticle (authors) {

    const _authors = await Promise.all(authors.map(async (a) => {
        return await GetUser(a)
    }))

    return {
        authors:
            _authors
        ,
        versions: [
            {
                createdAt: "2024-12-24T01:09:49.804Z",
                updatedAt: "2024-12-24T01:09:49.804Z",
                components: [
                    // {
                    //     type: "text",
                    //     lines: [
                    //         "Denne teksten må endres før den publiseres!",
                    //         "Den er *skrå*, den er **fet** eller ***begge to***",
                    //         "Den er *skrå*",
                    //         "den er **fet**",
                    //         "eller ***begge to***"
                    //     ]
                    // },
                    // {
                    //     type: "image",
                    //     src: "https://bamblingen.no/api/files?fileId=cachedImage.png",
                    //     alt: "",
                    //     credit: "Foto: Bamblingen.no"
                    // },
                    // {
                    //     type: "text",
                    //     lines: [
                    //         "Denne teksten må endres før den publiseres!",
                    //     ]
                    // },
                ],
                title: "",
                subtitle: "",
                image: "/images/langesund.jpeg",
                location: "Herre"
            },
        ],
        categories: [
            {
                name: "Bamble",
                id: "bamble"
            },
        ]
    }
}