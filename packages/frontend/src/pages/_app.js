import { Fragment } from "react";
import Head from "next/head";
import "@/styles/style.css";
import GoogleTagManager from "@/scripts/GoogleTagManager";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Your Page Title</title>
        <meta name="description" content="Your page description" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css"
          rel="stylesheet"
        />

        <GoogleTagManager />
      </Head>
      <Component {...pageProps} />
      <div id="modal-root"></div>
    </Fragment>
  );
}

export default MyApp;
