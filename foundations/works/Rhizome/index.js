import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

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

export default function Rhizome({ projectsData, socket, isVisible, connectionData, handleProjectClick, handleCurrentTarget }) {
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
    if (socket && socket.current) {
      socket.current.emit("project-click", currentTarget);
    }
  }, [currentTarget]);

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
    if (!isVisible) return;

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
        link.attr("d", linkArc);
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });

      //on click
      node.on("click", (ev, d) => {
        const { id, text } = d;
        handleNewKeywordClick(ev, text);
      });

      ["mouseenter", "touch"].forEach((eventType) => {
        node.on(eventType, (ev, d) => {
          ev.stopPropagation();
          const { id, text } = d;
          setCurrentTarget(text);
          lastInteractionTimeRef.current = Date.now();
        });
      });
    }
  }, [isVisible, connectionData, windowWidth, windowHeight]);

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
      // .attr("stroke", `hsl(${currentTarget ? currentTarget.length * 30 : 0}, 100%, 70%)`)
      .attr("stroke", (d) => {
        //d get two connected nodes
        const { source, target } = d;
        const { text: sourceText } = source;
        const { text: targetText } = target;

        //get common keywords
        const sourceKeywords = projectsData.find((project) => project.name === sourceText).keywords.map((el) => el.name);
        const targetKeywords = projectsData.find((project) => project.name === targetText).keywords.map((el) => el.name);

        const commonKeywords = sourceKeywords.filter((keyword) => targetKeywords.includes(keyword));
        //add length of each commonkeywords
        const keywordsFirstLettersAvg =
          commonKeywords.reduce(
            (acc, keyword) =>
              acc +
              keyword
                .split("")
                .map((letter) => letter.charCodeAt(0))
                .reduce((acc, code) => acc + code, 0),
            0
          ) / commonKeywords.length;

        return `hsl(${(keywordsFirstLettersAvg * 0.03 + (currentTarget ? currentTarget.length * 30 : 200)) % 360}, 100%, 70%)`;
      })
      .attr("opacity", "0.4")
      .attr("stroke-width", () => (windowWidth + windowHeight) * 0.0005);
    // node.selectAll("circle").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, 0.05)");
    node.selectAll("text").transition().duration(DURATION).attr("font-size", "1.4rem").attr("x", ".3rem").attr("y", ".45rem").attr("fill", "rgba(255, 255, 255, 0.02)");

    if (node && simulation) {
      simulation.alphaTarget(0.01).restart();
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
  }, [connectionData, currentTarget, windowWidth, windowHeight, primaryColor, secondaryColor]);

  return (
    <S.Container isVisible={isVisible}>
      {/* <S.ColorPickers>
        <HexColorPicker color={primaryColor} onChange={setPrimaryColor} />
        <HexColorPicker color={secondaryColor} onChange={setSecondaryColor} />
        {primaryColor}
        {secondaryColor}
      </S.ColorPickers> */}

      <svg ref={svgRef} width={windowWidth} height={windowHeight} viewBox={`0 0 ${windowWidth} ${windowHeight}`} />
    </S.Container>
  );
}

///helper functions

function linkArc(d) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
       M${d.source.x},${d.source.y}
       A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
     `;
}
