/**
 * Home Page
 *
 * This is the landing page of the application.
 * It displays a welcome message and links to other pages.
 */
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>IMR - Internet Movies Rental</title>
        <meta
          name="description"
          content="Internet Movies Rental Company portal"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-10">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to IMR Portal</h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Your one-stop destination for movie rentals and information. Explore
            our collection of movies and find your next favorite!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Browse Movies
            </h2>
            <p className="text-gray-600 mb-6">
              Explore our extensive collection of movies. Find information about
              titles, actors, and release years.
            </p>
            <Link href="/movies">
              <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 cursor-pointer">
                View Movies
              </span>
            </Link>
          </div>

          {session ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl text-black font-bold mb-4">
                Welcome Back, {session.user.name}!
              </h2>
              <p className="text-gray-600 mb-6">
                {session.user.role === "ADMIN"
                  ? "As an admin, you can manage the movie database, add new movies, and update existing ones."
                  : "Enjoy browsing our movie collection and discovering new titles."}
              </p>
              {session.user.role === "ADMIN" && (
                <Link href="/movies/add">
                  <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 cursor-pointer">
                    Add New Movie
                  </span>
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Join Us</h2>
              <p className="text-gray-600 mb-6">
                Sign in to your account or create a new one to get the full IMR
                experience.
              </p>
              <div className="flex space-x-4">
                <Link href="/login">
                  <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 cursor-pointer">
                    Sign In
                  </span>
                </Link>
                <Link href="/signup">
                  <span className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 cursor-pointer">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
