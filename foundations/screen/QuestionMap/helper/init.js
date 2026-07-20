//d3
import * as d3 from "d3";
import forceBoundary from "d3-force-boundary";

function initCleanUp({ svg }) {
  const everything = svg.selectAll("*");
  everything.remove();
}

function initCreateSimulation({ nodes, links, width, height }) {
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.text)
    )
    .force("charge", d3.forceManyBody().strength(-60 * ((width + height) / 750) ** 2))
    .force("center", d3.forceCenter())
    .force("boundary", forceBoundary(-width * 0.6, -height * 0.45, width * 0.6, height * 0.45));

  return simulation;
}

function initMarkerStyling({ svg, types, color, width, height }) {
  svg.attr("viewBox", [-width / 2, -height / 2, width, height]).style("font", "12px sans-serif");

  svg
    .append("defs")
    .selectAll("marker")
    .data(types)
    .join("marker")
    .attr("id", (d) => `arrow-${d}`)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -0.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("fill", color)
    .attr("d", "M0,-5L10,0L0,5");
}

function initLinkStyling({ svg, links, color, width, height }) {
  const link = svg
    .append("g")
    .attr("fill", "none")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("id", (d) => `link-${d.source.id}-${d.target.id}`)
    .attr("class", (d) => `link-source-${d.source.id} link-target-${d.target.id}`)
    .attr("stroke", (d) => color(d.isCycle ? "isCycle" : "isNotCycle"))
    .attr("stroke-width", (d) => 0.6 * width * 0.002)
    .attr("opacity", "0.20");

  return link;
}

function initNodeStyling({ svg, nodes, simulation, width, height }) {
  const node = svg.append("g").attr("fill", "currentColor").attr("stroke-linecap", "round").attr("stroke-linejoin", "round").selectAll("g").data(nodes).join("g").call(drag(simulation));

  node
    .append("circle")
    .attr("id", (d) => `circle-${d.id}`)
    .attr("r", width * 0.002)
    .attr("fill", "rgba(255, 255, 255, 0.1)");

  node
    .append("text")
    .attr("id", (d) => `text-${d.id}`)
    .attr("x", ".7vw")
    .attr("y", ".3vw")
    .attr("font-size", "1.1vw")
    .attr("font-family", "Bebas Neue")
    .attr("fill", "rgba(255, 255, 255, 0.05)")
    .text((d) => d.shortDescription || d.text)
    .clone(true)
    .lower();

  const targetNodes = node.filter((d) => d.text === "≠");
  targetNodes.each((d, i) => {
    //pentagon
    d.fx = 0;
    d.fy = 0;
  });

  return node;
}

function drag(simulation) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  return d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);
}

//export
export { initCleanUp, initCreateSimulation, initMarkerStyling, initLinkStyling, initNodeStyling };
