import Head from "next/head";
import { NextSeo } from "next-seo";

import dynamic from "next/dynamic";
const Uploader = dynamic(() => import("containers/uploader"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>RCA IED Show 2023 || Royal College of Art Information Expereience Design Public Event</title>
        <meta name="title" content={"RCA IED Show 2023 || Royal College of Art Information Expereience Design"} />

        <meta name="description" content="RCA IED Show 2023: Royal College of Art Information Expereience Design Public Event" />
        <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      </Head>
      <NextSeo title="RCA IED 2023" description="RCA IED 2023: Royal College of Art Information Expereience Design Public Event MA1 2023" />

      <Uploader />
    </>
  );
}
