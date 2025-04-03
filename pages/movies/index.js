import 'dotenv/config'; // Ensure environment variables are loaded
import Head from "next/head";
import { useState } from "react";
import MovieList from "../../components/movies/MovieList";
import { useSession } from "next-auth/react";
import Link from "next/link";
import prisma from "../../lib/prisma";

export default function Movies({ movies }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const filteredMovies =
    searchTerm.trim() === ""
      ? movies
      : movies.filter((movie) => {
          const term = searchTerm.toLowerCase();
          return (
            movie.title.toLowerCase().includes(term) ||
            (movie.actors && movie.actors.some((actor) => actor.toLowerCase().includes(term))) ||
            movie.releaseYear.toString().includes(term)
          );
        });

  return (
    <>
      <Head>
        <title>Movies Collection</title>
        <meta name="description" content="Browse our movie collection" />
      </Head>
      <div className="py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Movies Collection</h1>
          {isAdmin && (
            <Link href="/movies/add">
              <span className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer">
                + Add New Movie
              </span>
            </Link>
          )}
        </div>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search movies by title, actor, or year..."
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredMovies.length > 0 ? (
          <MovieList movies={filteredMovies} />
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No movies found</h2>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  console.log("DATABASE_URL in getServerSideProps:", process.env.DATABASE_URL);
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { title: "asc" },
    });
    console.log("Fetched movies count:", movies.length);
    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { props: { movies: [] } };
  }
}

