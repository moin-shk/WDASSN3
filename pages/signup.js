/**
 * Signup Page
 *
 * This page allows users to create new accounts.
 * It redirects authenticated users to the home page.
 */
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SignupForm from "../components/auth/SignupForm";

export default function Signup() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Sign Up - IMR Portal</title>
        <meta name="description" content="Create an IMR account" />
      </Head>

      <div className="py-10">
        <SignupForm />
      </div>
    </>
  );
}
