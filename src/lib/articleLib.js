
import crypto from "crypto"
import slugify from "slugify";
import { db } from "./db";


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

