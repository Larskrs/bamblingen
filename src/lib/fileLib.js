
import crypto from "crypto"
import slugify from "slugify";
import { db } from "./db";

export function cleanFilename(filename) {
    // Step 1: Remove any characters not allowed in filenames.
    let cleaned = filename.replace(/[\/\\:*?"<>|]/g, '');
  
    // Step 2: Trim any leading or trailing whitespace.
    cleaned = cleaned.trim();
  
    // Step 3: Replace spaces and sequences of spaces or dashes with a single underscore.
    cleaned = cleaned.replace(/[\s-]+/g, '_');
  
    // Step 4: Remove leading or trailing dots to prevent issues with hidden files.
    cleaned = cleaned.replace(/^\.+|\.+$/g, '');
  
    // Step 5: Ensure the filename is not empty and has a valid length.
    if (cleaned.length === 0) {
      return 'default_filename';
    }
  
    // Step 6: Optionally truncate filename to a specific length, e.g., 255 characters for most filesystems.
    const maxLength = 255;
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength);
    }
  
    return cleaned;
  }


export async function GenerateUniqueIdentifier(creationDate) {
        const formattedDate = creationDate.toISOString().slice(0, 10);
        const datePart = formattedDate.replace(/-/g, ''); // YYYYMMDD format
        let uniqueIdentifier;
        
        let collisions = 0

        // Retry mechanism in case of collisions
        while (true) {
            const randomPart = crypto.randomBytes(24).toString('hex'); // 6-character random string
            uniqueIdentifier = `${datePart}-${randomPart}`;

            // Check if the identifier is unique in the database
            const existingItem = await db.file.findUnique({
                where: {
                    createdAt: {
                        gte: new Date(`${formattedDate}T00:00:00Z`), // Start of the day
                        lt: new Date(`${formattedDate}T23:59:59Z`), // End of the day
                    },
                    id: uniqueIdentifier
                },
            });
            if (existingItem) {
              collisions++
            }

            if (!existingItem) {
                break; // Exit the loop if the identifier is unique
            }
        }

        return uniqueIdentifier;
    }



export const FileTypeIcons = {
  image: "/icons/icon_file_image.svg",
  video: "/icons/icon_file_video.svg",
}

export const GetFileFallbackIcon = (contentType) => {
  if (Object.keys(FileTypeIcons).includes(contentType)) {
    return FileTypeIcons[contentType]
  } else {
    return "/icons/icon_text.svg"
  }
}