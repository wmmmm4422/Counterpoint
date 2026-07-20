import Head from "next/head";
import prisma from "lib/prisma";

import dynamic from "next/dynamic";

const Screen = dynamic(() => import("containers/screen"), { ssr: false });

export default function ScreenPage({ projects, events }) {
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

      <Screen projects={projects} events={events} />
    </>
  );
}

export const getStaticProps = async (context) => {
  try {
    const projectsData = await prisma.projects.findMany({
      include: {
        keywords: {
          select: {
            name: true,
          },
        },
      },
    });
    const metaData = await handleRelatedProjects(projectsData);

    const eventsData = await prisma.events.findMany();

    return {
      props: {
        projects: metaData,
        events: eventsData,
      },
    };
  } catch (e) {
    console.log(e);
  }
};

async function handleRelatedProjects(data) {
  return data.map((datum, i) => {
    let keywords = datum.keywords.map((keyword) => keyword.name);
    let relatedProjects = [];
    for (const keyword of keywords) {
      let commonKeywords = data.filter((project) => project.keywords.map((keyword) => keyword.name).includes(keyword));
      relatedProjects.push(...commonKeywords);
    }

    //delete redundant
    relatedProjects = [...new Set(relatedProjects)];
    relatedProjects = relatedProjects.filter((project) => project.name !== datum.name);

    return {
      ...datum,
      relatedProjects,
    };
  });
}
