/**
 * Movies List Page
 *
 * This page displays a list of all movies in the database.
 * It includes search functionality and admin controls for movie management.
 */
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import MovieList from "../../components/movies/MovieList";
import prisma from "../../lib/prisma";

export default function Movies({ initialMovies }) {
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  // Filter movies based on search term
  const filteredMovies =
    searchTerm.trim() === ""
      ? movies
      : movies.filter(
          (movie) =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.actors.some((actor) =>
              actor.toLowerCase().includes(searchTerm.toLowerCase())
            ) ||
            movie.releaseYear.toString().includes(searchTerm)
        );

  // Handle movie deletion
  const handleDeleteMovie = (deletedId) => {
    setMovies(movies.filter((movie) => movie.id !== deletedId));
  };

  return (
    <>
      <Head>
        <title>Movies - IMR Portal</title>
        <meta name="description" content="Browse our movie collection" />
      </Head>

      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0 text-white">
            Movies Collection
          </h1>

          {isAdmin && (
            <Link href="/movies/add">
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer">
                + Add New Movie
              </span>
            </Link>
          )}
        </div>

        {/* Search input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search movies by title, actor, or year..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Movie list with notification for no results */}
        {filteredMovies.length > 0 ? (
          <MovieList
            movies={filteredMovies}
            onDeleteMovie={handleDeleteMovie}
          />
        ) : (
          <div className="text-center py-10 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-2">
              No movies found
            </h2>
            <p className="text-gray-400">
              Try adjusting your search criteria or add a new movie.
            </p>
            {isAdmin && (
              <Link href="/movies/add">
                <span className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                  Add New Movie
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// Server-side data fetching
export async function getServerSideProps() {
  try {
    // Fetch all movies from the database
    const movies = await prisma.movie.findMany({
      orderBy: {
        title: "asc",
      },
    });

    // Convert dates to strings to make the data serializable
    return {
      props: {
        initialMovies: JSON.parse(JSON.stringify(movies)),
      },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return {
      props: {
        initialMovies: [],
      },
    };
  }
}
