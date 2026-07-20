import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

import { Leva, useControls } from "leva";

//resize
import { useResizeDebounce } from "utils/hooks/useResize";

//d3
import * as d3 from "d3";
import { initCleanUp, initCreateSimulation, initMarkerStyling, initLinkStyling, initNodeStyling } from "./helper/init";
import { updateTargetAndSourceNodes, updateCurrentNode } from "./helper/update";

export const PRIMARY_COLOR = "hsl(106, 100%, 70%)";
export const SECONDARY_COLOR = "#CBC6E5";
const DURATION = 150;

const getRandom = (a, b) => Math.random() * (b - a) + a;

export default function Rhizome({ projectsData, isScreen = false, socket, connectionData, handleProjectClick, handleCurrentTarget }) {
  const [primaryColor, setPrimaryColor] = useState(PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColor] = useState(SECONDARY_COLOR);

  const svgRef = useRef();

  //size
  const [windowWidth, windowHeight] = useResizeDebounce();

  //d3-related states
  const simulationRef = useRef(null);
  const linkRef = useRef(null);
  const nodeRef = useRef(null);

  const [currentTarget, setCurrentTarget] = useState(null);
  const currentTargetRef = useRef(null);
  const lastInteractionTimeRef = useRef(null);

  useEffect(() => {
    currentTargetRef.current = currentTarget;
    handleCurrentTarget(currentTarget);
    if (socket && socket.current && !isScreen) {
      socket.current.emit("vna-project-click", currentTarget);
    }
  }, [currentTarget, isScreen]);

  function handleNewKeywordClick(e, target) {
    e.stopPropagation();

    setCurrentTarget(target);

    if (target === currentTargetRef.current) {
      if (Date.now() - lastInteractionTimeRef.current > 200) {
        handleProjectClick(target);
      }
    }
    lastInteractionTimeRef.current = Date.now();
  }

  useEffect(() => {
    if (windowWidth === 0 || windowHeight === 0) return;

    triggerInit();
    function triggerInit() {
      const types = ["isCycle", "isNotCycle"];
      const width = windowWidth;
      const height = windowHeight;
      const svg = d3.select(svgRef.current);
      const links = connectionData.links.map((d) => Object.create(d));
      const nodes = connectionData.nodes.map((d) => Object.create(d));

      //prevent any zoom effect
      svg.call(d3.zoom().on("zoom", null));

      //cleanup
      initCleanUp({ svg });
      //marker default styling
      initMarkerStyling({ svg, types, width, height });

      //create simulation
      const simulation = initCreateSimulation({ nodes, links, width, height });
      //link styling
      const link = initLinkStyling({ svg, links, width, height });
      //node styling
      const node = initNodeStyling({ svg, nodes, simulation, width, height, setCurrentTarget });

      simulationRef.current = simulation;
      linkRef.current = link;
      nodeRef.current = node;

      //tick simulation
      simulation.on("tick", () => {
        link.attr("d", (d) => linkArc(d));
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

      //on click
      node.on("click", (ev, d) => {
        if (!isScreen) {
          const { id, text } = d;
          handleNewKeywordClick(ev, text);
        }
      });

      ["mouseenter", "touch"].forEach((eventType) => {
        node.on(eventType, (ev, d) => {
          ev.stopPropagation();

          if (!isScreen) {
            const { id, text } = d;
            setCurrentTarget(text);
            lastInteractionTimeRef.current = Date.now();
          }
        });
      });
    }
  }, [connectionData, isScreen, windowWidth, windowHeight]);

  ////////////
  ///interaction///
  //////////
  const targetNodesRef = useRef(null);
  const sourceNodesRef = useRef(null);

  useEffect(() => {
    if (!simulationRef.current) return;
    let node = nodeRef.current;
    let simulation = simulationRef.current;
    let link = linkRef.current;

    let targetConnectedWords = connectionData.links.filter((l) => l.source === currentTarget || l.target === currentTarget).map((l) => (l.source === currentTarget ? l.target : l.source));

    link
      .transition()
      .duration(DURATION)
      .attr("stroke", (d) => {
        //d get two connected nodes
        const { source, target } = d;
        const { text: sourceText, projectIdx: sourceProjectIdx } = source;
        const { text: targetText, projectIdx: targetProjectIdx } = target;

        //get common keywords
        // const sourceKeywords = projectsData.find((project) => project.name === sourceText).relatedKeywords;
        // const targetKeywords = projectsData.find((project) => project.name === targetText).relatedKeywords;

        // const commonKeywords = sourceKeywords.filter((keyword) => targetKeywords.includes(keyword));
        // //add length of each commonkeywords
        // const keywordsFirstLettersAvg =
        //   commonKeywords.reduce(
        //     (acc, keyword) =>
        //       acc +
        //       keyword
        //         .split("")
        //         .map((letter) => letter.charCodeAt(0))
        //         .reduce((acc, code) => acc + code, 0),
        //     0
        //   ) / commonKeywords.length;

        return `hsl(${(sourceProjectIdx + targetProjectIdx) * 5 + 250}, 100%, 70%)`;
        // return `hsl(${(sourceProjectIdx + targetProjectIdx) * 10 + ((currentTarget ? currentTarget.length * 30 : 200) % 360)}, 100%, 70%)`;
      })
      .attr("opacity", (d) => {
        const { type } = d;
        let opacity = type === 1 ? 1 : 0.6;
        return opacity;
      })
      .attr("stroke-width", (d) => {
        const { type } = d;
        let weight = type === 1 ? 1 : 2.5;
        return (windowWidth + windowHeight) * 0.00065 * weight;
      });

    node
      .selectAll("text")
      .transition()
      .duration(DURATION)
      .attr("font-size", "1.4rem")
      .attr("x", ".3rem")
      .attr("y", ".45rem")
      .attr("fill", (d) => {
        return d.type === "project" && isScreen ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.02)";
      });

    if (node && simulation) {
      simulation.alphaTarget(0.09).restart();
      //link and main node clean up
      const nodes = node.filter((d) => d.text === currentTarget);

      nodes.each((d) => {
        /////TARGET AND SOURCE NODES //////////////////////////////////
        updateTargetAndSourceNodes({
          data: connectionData,
          d,
          node,
          link,
          targetNodesRef,
          sourceNodesRef,
          width: windowWidth,
          height: windowHeight,
          currentTargetLength: currentTarget.length,
          targetConnectedWordsLength: targetConnectedWords.length,
        });
        ////// CURRENT NODE //////////////////////////////////
        updateCurrentNode({ d, node });
      });
    }
  }, [connectionData, currentTarget, windowWidth, windowHeight, primaryColor, secondaryColor, isScreen]);

  return (
    <S.Container isScreen={isScreen}>
      <Leva />
      <svg ref={svgRef} width={windowWidth} height={windowHeight} viewBox={`0 0 ${windowWidth} ${windowHeight}`} />
    </S.Container>
  );
}

function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y + 20) * 0.9;
  return `
       M${d.source.x},${d.source.y}
       A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
     `;
}
