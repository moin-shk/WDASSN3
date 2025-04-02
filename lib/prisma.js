/**
 * Prisma Client Instance
 *
 * This module exports a singleton instance of the Prisma Client.
 * It ensures that we don't create multiple instances of Prisma Client in development.
 */
import 'dotenv/config';
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
