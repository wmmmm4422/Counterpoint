import Head from "next/head";

import dynamic from "next/dynamic";

import { BACKGROUND_CONNECTIONS } from "containers/vna/data/constant";

const Mobile = dynamic(() => import("containers/vna/mobile"), { ssr: false });

export default function WorksPage() {
  return (
    <>
      <Head>
        <title></title>
        <meta name="title" content={"RCA IED 2023"} />

        <meta name="description" content="RCA IED 2023: Royal College of Art Information Expereience Design Public Event" />
        <meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      </Head>

      <Mobile backgroundConnectionData={BACKGROUND_CONNECTIONS} />
    </>
  );
}

// export const getStaticProps = async (context) => {
//   try {
//     const projectsData = await prisma.projects.findMany({
//       include: {
//         keywords: {
//           select: {
//             name: true,
//           },
//         },
//       },
//     });
//     const connectionData = await connectionToNodeLink(projectsData);
//     console.log(connectionData);

//     return {
//       props: {
//         projectsData,
//         connectionData,
//       },
//     };
//   } catch (e) {
//     console.log(e);
//   }
// };

// async function connectionToNodeLink(data) {
//   let nodes = data.map((item) => ({
//     text: item.name,
//   }));
//   let links = [];

//   for (let i = 0; i < data.length; i++) {
//     let keywords = data[i].keywords.map((keyword) => keyword.name);
//     let relatedProjects = [];
//     for (const keyword of keywords) {
//       let commonKeywords = data.filter((project) => project.keywords.map((keyword) => keyword.name).includes(keyword)).map((project) => project.name);
//       relatedProjects.push(...commonKeywords);
//     }

//     //delete redundant
//     relatedProjects = [...new Set(relatedProjects)];
//     relatedProjects.forEach((project) => {
//       if (links.find((link) => link.target === data[i].name && link.source === project)) return;

//       links.push({
//         source: data[i].name,
//         target: project,
//         value: 1,
//       });
//     });
//   }
//   return { nodes, links };
// }
