import Head from "next/head";
import prisma from "lib/prisma";
import dynamic from "next/dynamic";

const Events = dynamic(() => import("containers/events"), { ssr: false });

export default function Home({ events }) {
  return (
    <>
      <Head>
        <title>RCA IED 2023 || Royal College of Art Information Expereience Design Public Event</title>
        <meta name="title" content={"RCA IED 2023"} />

        <meta name="description" content="RCA IED 2023: Royal College of Art Information Expereience Design Public Event" />
        <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      </Head>

      <Events events={events} />
    </>
  );
}

export const getStaticProps = async (context) => {
  try {
    const eventsData = await prisma.events.findMany();

    return {
      props: {
        events: eventsData,
      },
    };
  } catch (e) {
    console.log(e);
  }
};
