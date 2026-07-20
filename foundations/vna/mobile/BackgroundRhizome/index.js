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

export default function Rhizome({ isScreen, connectionData }) {
  const svgRef = useRef();

  //size
  const [windowWidth, windowHeight] = useResizeDebounce();

  //d3-related states
  const simulationRef = useRef(null);
  const linkRef = useRef(null);
  const nodeRef = useRef(null);

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
      const link = initLinkStyling({ svg, links, width, height, isScreen });
      //node styling
      const node = initNodeStyling({ svg, nodes, simulation, width, height });

      simulationRef.current = simulation;
      linkRef.current = link;
      nodeRef.current = node;

      //tick simulation
      simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", (d) => `translate(${d.x},${d.y})`);
      });
    }
  }, [connectionData, windowWidth, windowHeight]);

  ////////////
  ///interaction///
  //////////
  const targetNodesRef = useRef(null);
  const sourceNodesRef = useRef(null);

  return (
    <S.Container isScreen={isScreen}>
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
