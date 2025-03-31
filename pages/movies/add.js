/**
 * Add Movie Page
 *
 * This page allows admin users to add new movies to the database.
 * It uses the MovieForm component for input and validation.
 */
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import MovieForm from "../../components/movies/MovieForm";

export default function AddMovie() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "authenticated" && session.user.role !== "ADMIN") {
      router.push("/movies");
    } else if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/movies/add");
    }
  }, [status, session, router]);

  if (
    status === "loading" ||
    (status === "authenticated" && session.user.role !== "ADMIN")
  ) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Add Movie - IMR Portal</title>
        <meta name="description" content="Add a new movie to the database" />
      </Head>

      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Add New Movie</h1>
        <MovieForm />
      </div>
    </>
  );
}
