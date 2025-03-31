import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

dotenv.config();

const prisma = new PrismaClient();
async function main() {
  // Check if admin already exists
  const adminExists = await prisma.user.findUnique({
    where: {
      email: "admin@imr.com",
    },
  });

  if (!adminExists) {
    // Create admin user
    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@imr.com",
        password: await bcrypt.hash("admin123", 10),
        role: "ADMIN",
      },
    });
    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }

  // Add some sample movies
  const moviesCount = await prisma.movie.count();

  if (moviesCount === 0) {
    await prisma.movie.createMany({
      data: [
        {
          title: "Inception",
          actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
          releaseYear: 2010,
        },
        {
          title: "The Dark Knight",
          actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
          releaseYear: 2008,
        },
        {
          title: "Interstellar",
          actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
          releaseYear: 2014,
        },
      ],
    });
    console.log("Sample movies added successfully");
  } else {
    console.log("Movies already exist in the database");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
