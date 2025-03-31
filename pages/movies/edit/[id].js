/**
 * Edit Movie Page
 *
 * This page allows admin users to edit existing movies.
 * It fetches the movie data and passes it to the MovieForm component.
 */
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import MovieForm from "../../../components/movies/MovieForm";
import prisma from "../../../lib/prisma";

export default function EditMovie({ movie }) {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (status === "authenticated" && session.user.role !== "ADMIN") {
      router.push("/movies");
    } else if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/movies/edit/${router.query.id}`);
    }
  }, [status, session, router]);

  // Redirect if movie not found
  useEffect(() => {
    if (!movie && status !== "loading") {
      router.push("/movies");
    }
  }, [movie, status, router]);

  if (
    status === "loading" ||
    (status === "authenticated" && session.user.role !== "ADMIN") ||
    !movie
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
        <title>Edit Movie - IMR Portal</title>
        <meta name="description" content={`Edit ${movie.title}`} />
      </Head>

      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Edit Movie</h1>
        <MovieForm movie={movie} />
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { id } = params;
    const movie = await prisma.movie.findUnique({
      where: {
        id,
      },
    });

    if (!movie) {
      return {
        props: {
          movie: null,
        },
      };
    }

    return {
      props: {
        movie: JSON.parse(JSON.stringify(movie)),
      },
    };
  } catch (error) {
    console.error("Error fetching movie:", error);
    return {
      props: {
        movie: null,
      },
    };
  }
}
