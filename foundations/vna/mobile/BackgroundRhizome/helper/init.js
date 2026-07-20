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
    .force("charge", d3.forceManyBody().strength(-120 * (Math.min(width, height * 0.8) / 200) ** 2))
    .force("center", d3.forceCenter())
    .force("boundary", forceBoundary(-width * 0.5, -height * 0.5, width * 0.5, height * 0.5));

  return simulation;
}

function initMarkerStyling({ svg, types, width, height }) {
  svg.attr("viewBox", [-width / 2, -height / 2, width, height]).style("font", "15px sans-serif");

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
    .attr("fill", "#cbc6e5")
    .attr("d", "M0,-5L10,0L0,5");
}

function initLinkStyling({ svg, links, width, height, isScreen }) {
  const link = svg
    .append("g")
    .attr("fill", "none")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("id", (d) => `link-${d.source.id}-${d.target.id}`)
    .attr("class", (d) => `link-source-${d.source.id} link-target-${d.target.id}`)
    .attr("stroke", (d) => `hsl(${250 + d.source.text.length}, 100%, 70%)`)
    .attr("stroke-width", (d) => (width + height) * 0.0007)
    .attr("opacity", isScreen ? "0.28" : "0.27");

  return link;
}

function initNodeStyling({ svg, nodes, simulation, width, height, setCurrentTarget }) {
  const node = svg.append("g").attr("fill", "#cbc6e5").attr("stroke-linecap", "round").attr("stroke-linejoin", "round").selectAll("g").data(nodes).join("g").call(drag(simulation, setCurrentTarget));

  node
    .append("circle")
    .attr("id", (d) => `circle-${d.id}`)
    .attr("r", (width + height) * 0.01)
    .attr("fill", "transparent");

  node
    .append("text")
    .attr("id", (d) => `text-${d.id}`)
    .attr("x", ".3rem")
    .attr("y", ".45rem")
    .attr("font-size", "1rem")
    .attr("font-family", "Roboto Serif")
    .attr("font-style", "italic")
    .attr("fill", "rgba(255, 255, 255, 0.02)")
    .text((d) => d.text)
    .clone(true)
    .lower();

  return node;
}

function drag(simulation, setCurrentTarget) {
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(1).restart();
    d.fx = d.x;
    d.fy = d.y;
    setCurrentTarget(d.text);
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
    setCurrentTarget(d.text);
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
