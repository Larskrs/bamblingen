import axios from 'axios';

/**
 * Fetches the dimensions of an image from its URL without using external libraries for parsing.
 * @param {string} imageUrl - The URL of the image.
 * @returns {Promise<{width: number, height: number, type: string}>} - Dimensions and type of the image.
 */
export async function getImageDimensions(imageUrl) {
  try {
    // Fetch the image data as a buffer
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'arraybuffer', // Get the binary data
    });

    const buffer = Buffer.from(response.data); // Convert ArrayBuffer to Node.js Buffer
    const type = getImageType(buffer);

    if (type === 'jpeg') {
      return parseJPEG(buffer);
    } else if (type === 'png') {
      return parsePNG(buffer);
    } else {
      throw new Error(`Unsupported image type: ${type}`);
    }
  } catch (error) {
    console.error('Error fetching or processing the image:', error.message);
    throw error;
  }
}

/**
 * Determines the image type from its buffer.
 * @param {Buffer} buffer - The binary buffer of the image.
 * @returns {string} - The image type (e.g., 'jpeg', 'png').
 */
function getImageType(buffer) {
  if (buffer.slice(0, 2).toString('hex') === 'ffd8') {
    return 'jpeg';
  } else if (buffer.slice(0, 8).toString('hex') === '89504e470d0a1a0a') {
    return 'png';
  } else {
    return 'unknown';
  }
}

/**
 * Parses JPEG image dimensions.
 * @param {Buffer} buffer - The binary buffer of the JPEG image.
 * @returns {{width: number, height: number, type: string}} - JPEG dimensions and type.
 */
function parseJPEG(buffer) {
  let offset = 2; // JPEG files start with 0xFFD8
  const length = buffer.length;

  while (offset < length) {
    const marker = buffer.readUInt16BE(offset);
    offset += 2;

    // 0xFFC0 is the "Start of Frame" marker for baseline JPEGs
    if (marker === 0xffc0 || marker === 0xffc2) {
      offset += 3; // Skip length and sample precision
      const height = buffer.readUInt16BE(offset);
      const width = buffer.readUInt16BE(offset + 2);
      return { width, height, type: 'jpeg' };
    } else {
      const segmentLength = buffer.readUInt16BE(offset);
      offset += segmentLength; // Move to the next marker
    }
  }

  throw new Error('Invalid JPEG file');
}

/**
 * Parses PNG image dimensions.
 * @param {Buffer} buffer - The binary buffer of the PNG image.
 * @returns {{width: number, height: number, type: string}} - PNG dimensions and type.
 */
function parsePNG(buffer) {
  // PNG header: 8 bytes, followed by the IHDR chunk
  if (buffer.slice(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Invalid PNG file');
  }

  const width = buffer.readUInt32BE(16); // Width is at offset 16 in the IHDR chunk
  const height = buffer.readUInt32BE(20); // Height is at offset 20 in the IHDR chunk

  return { width, height, type: 'png' };
}