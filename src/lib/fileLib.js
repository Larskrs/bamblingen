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