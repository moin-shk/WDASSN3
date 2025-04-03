require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { title: 'asc' },
    });
    console.log("Movies:", movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
