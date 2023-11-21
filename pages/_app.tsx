import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import { Layout } from "../components/layout";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout pageProps={pageProps} routerInfo={router}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
