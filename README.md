# Internet Movies Rental (IMR) Portal

This project is a full-stack web application for the Internet Movies Rental Company, built with Next.js, MongoDB, and Prisma. The portal allows users to browse movies and administrators to manage the movie database.

## Features

- **User Authentication**

  - Sign up and login functionality
  - Role-based access control (Admin and User roles)
  - Protected routes for admin-only actions

- **Movie Management**

  - Browse the complete movie collection
  - Search functionality by title, actor, or release year
  - Admin-only features:
    - Add new movies
    - Edit existing movie details
    - Delete movies from the database

- **Responsive Design**
  - Mobile-friendly interface
  - Accessible navigation and forms

## Technology Stack

- **Frontend**

  - Next.js (React framework)
  - TailwindCSS for styling

- **Backend**

  - Next.js API routes
  - Prisma ORM
  - MongoDB database

- **Authentication**
  - NextAuth.js
  - JWT (JSON Web Tokens)
  - Bcrypt for password hashing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or Atlas)
- Git

### Installation

1. Clone the repository

   ```
   git clone https://github.com/yourusername/imr-portal.git
   cd imr-portal
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Environment setup
   Create a `.env.local` file in the root directory with the following variables:

   ```
   DATABASE_URL="your_mongodb_connection_string"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_random_secret_key"
   ```

4. Set up the database schema

   ```
   npx prisma generate
   npx prisma db push
   ```

5. Start the development server

   ```
   npm run dev
   ```

6. Access the application at http://localhost:3000

## Project Structure

```
imr-portal/
├── components/       # Reusable React components
│   ├── auth/         # Authentication components
│   ├── layout/       # Layout components like navbar and footer
│   └── movies/       # Movie-related components
├── lib/              # Utility functions and libraries
├── pages/            # Next.js pages and API routes
│   ├── api/          # Backend API endpoints
│   └── movies/       # Movie-related pages
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
└── styles/           # Global CSS styles
```

## API Endpoints

- **Authentication**

  - `POST /api/auth/signup` - Register a new user
  - `POST /api/auth/[...nextauth]` - Handle authentication

- **Movies**
  - `GET /api/movies` - Get all movies
  - `POST /api/movies` - Add a new movie (admin only)
  - `GET /api/movies/[id]` - Get a specific movie
  - `PUT /api/movies/[id]` - Update a movie (admin only)
  - `DELETE /api/movies/[id]` - Delete a movie (admin only)

## Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String   @unique
  password  String
  role      String   @default("USER")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Movie Model

```prisma
model Movie {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  title       String
  actors      String[]
  releaseYear Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Creating Admin Users

All users who sign up through the application are assigned the `"USER"` role. To change a
user to an admin, you'll need to manually update their role in the database.

### Option 1: Using MongoDB Compass or Mongo Shell

Open your MongoDB database in MongoDB Compass or connect with Mongo Shell.

Find the user document you want to promote:

```
db.User.find({ email: "user@example.com" })
```

Update the user's role to `"ADMIN"`:

```
db.User.updateOne(
{ email: "user@example.com" },
{ $set: { role: "ADMIN" } }
)
```

### Option 2: Using Prisma Studio

1. Run the following command to open Prisma Studio:

```
npx prisma studio
```

2. Navigate to the **User** model.
3. Find the user you want to promote.
4. Change the `role` field to `"ADMIN"` and save the changes.

## Deployment

The application can be deployed to platforms like Vercel, Netlify, or a custom server. Make sure to set up the required environment variables in your deployment platform.
