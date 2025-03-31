/**
 * Custom App Component
 *
 * This component initializes pages and provides global context.
 * It includes the global styles and the SessionProvider for authentication.
 */
import { SessionProvider } from "next-auth/react";
import Layout from "../components/layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
