import { Fragment, useEffect } from "react";
import Head from "next/head";
import "@/styles/style.css";
import Navigation from "@/components/Navigation";
import Footer from "@/sections/Footer";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const removeMismatchedElements = () => {
        const serverRendered = document.querySelectorAll(
          "[data-server-rendered]"
        );
        serverRendered.forEach((element) => {
          element.parentNode.removeChild(element);
        });
      };

      removeMismatchedElements();
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Sistema de Saúde Pública - Public Health System</title>
        <meta
          name="description"
          content="Projeto para acesso de qualidade aos serviços médicos para promover a saúde da população."
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="p-0 min-h-screen bg-blue-200">
        <Navigation />
        <main className="flex-grow mx-20">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default MyApp;
