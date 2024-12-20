import { PrismaClient } from "@prisma/client";

let prisma;

// Use a singleton pattern to initialize the PrismaClient
if (!globalThis.prisma) {
  globalThis.prisma = new PrismaClient();
}

prisma = globalThis.prisma;

export const db = prisma;

export async function testConnection() {
  return await db.user.findMany({});
}
