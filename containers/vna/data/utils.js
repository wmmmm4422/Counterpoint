import { PROJECTS, CONNECTIONS } from "containers/vna/data/constant";
import axios from "axios";

export function projectsToConnection() {
  let nodes = [];

  for (const project of PROJECTS) {
    nodes.push({
      text: project.name,
      type: "project",
      projectIdx: PROJECTS.findIndex((p) => p.name === project.name),
    });

    for (const keyword of project.relatedKeywords) {
      //push only if there is no keyword
      if (nodes.find((node) => node.text === keyword)) continue;
      nodes.push({
        text: keyword,
        type: "keyword",
        projectIdx: PROJECTS.findIndex((p) => p.name === project.name),
      });
    }
  }

  let links = [];
  for (const project of PROJECTS) {
    for (const keyword of project.relatedKeywords) {
      links.push({
        source: project.name,
        target: keyword,
        type: 1,
      });
    }
  }

  //interconnection btw projects
  for (let i = 0; i < PROJECTS.length; i++) {
    for (let j = i + 1; j < PROJECTS.length; j++) {
      links.push({
        source: PROJECTS[i].name,
        target: PROJECTS[j].name,
        type: 2,
      });
    }
  }

  console.log({ nodes, links });

  return { nodes, links };
}

export async function deriveKeywords() {
  let keywords = [];

  for (const keyword of CONNECTIONS.nodes) {
    if (keyword.type !== "keyword") continue;

    let newKeyword = {
      keyword: keyword.text,
      relatedProjects: [],
      text: ``,
      imgURLs: [],
    };

    //related projects
    let relatedAbstract = "";
    for (const link of CONNECTIONS.links) {
      if (link.target !== keyword.text) continue;
      newKeyword.relatedProjects.push(link.source);
      relatedAbstract += PROJECTS.find((project) => project.name === link.source).abstract;
    }

    // //get definition
    // let textResult = await axios.post("/api/chatgpt", {
    //   systemContent: "Create a description about the given keyword, in a relationship with the Digital Art Project --> Do not copy and paste artwork abstract, please explain about the keyword.",
    //   userContent: `Given Keyword: ${keyword.text}, Artwork Name: ${newKeyword.relatedProjects[0]}, Artwork Abstract ${relatedAbstract}`,
    // });
    // console.log(textResult.data.text);

    // newKeyword.text = textResult.data.text;

    // console.log("65");
    // let imageResult = [];
    // let res = await axios.post("/api/image-search", {
    //   query: keyword.text,
    // });
    // imageResult.push(...res.data);
    // console.log(res);

    // imageResult = imageResult.filter((result) => result.mime === "image/jpeg" || result.mime === "image/png").map((res) => res.link);
    // newKeyword.imgURLs = imageResult;
    keywords.push(newKeyword);
  }

  console.log(keywords);
  return keywords;
}
