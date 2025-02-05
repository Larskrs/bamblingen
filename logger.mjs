// logger.mjs
import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper constants to handle __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define log file path
const logFilePath = path.join(__dirname, 'app.log');

// Function to clear logs
export function ClearLogs() {
  fs.writeFileSync(logFilePath, '', 'utf8');
}

// Custom log format
const logFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    logFormat
  ),
  transports: [
    // File transport (single log file)
    new transports.File({
      filename: logFilePath,
    }),
    // Console transport
    new transports.Console({
      format: format.combine(
        format.colorize(),
        logFormat
      ),
    }),
  ],
});

export default logger;
