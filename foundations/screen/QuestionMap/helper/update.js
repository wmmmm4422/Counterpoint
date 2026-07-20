//d3
import * as d3 from "d3";

export const DURATION = 400;

function updateHighlightNode({ d, node }) {
  let circle = d3.select(`#circle-${d.id}`);
  let text = node.filter((n) => n.text === d.text).selectAll("text");

  circle.transition().duration(DURATION).attr("fill", "hsl(90, 100%, 93%)");
  text.transition().duration(DURATION).attr("x", "1vw").attr("y", ".4vw").attr("font-size", "1.3vw").attr("fill", "hsl(180, 100%, 70%)");
}

function updateTargetAndSourceNodes({ data, d, node, link, targetNodesRef, sourceNodesRef, targetLinksRef, sourceLinksRef }) {
  let linksDataStartingFromTarget = data.links.filter((l) => l.source === d.text).map((d) => d.target);
  let linksDataEndingAtSource = data.links.filter((l) => l.target === d.text).map((d) => d.source);

  let targetNodes = node.filter((n) => linksDataStartingFromTarget.includes(n.text));
  let sourceNodes = node.filter((n) => linksDataEndingAtSource.includes(n.text));

  //text contents: shortdescritpon
  targetNodes.selectAll("text").text((d) => d.shortDescription || d.text);
  sourceNodes.selectAll("text").text((d) => d.shortDescription || d.text);

  //clean up
  if (targetNodesRef.current && sourceNodesRef.current) {
    targetNodesRef.current.selectAll("circle").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, 0.3)");
    targetNodesRef.current.selectAll("text").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, 0.07)");
    sourceNodesRef.current.selectAll("circle").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, 0.3)");
    sourceNodesRef.current.selectAll("text").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, 0.07)");

    // targetLinksRef.current.transition().duration(DURATION).attr("stroke", "hsl(180, 100%, 70%)").attr("opacity", 0.2);
    // sourceLinksRef.current.transition().duration(DURATION).attr("opacity", 0.07);
  }

  //new styling
  targetNodes.selectAll("circle").transition().duration(DURATION).attr("fill", "hsl(180, 100%, 70%)");
  // targetNodes.selectAll("text").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, .5)");
  sourceNodes.selectAll("circle").transition().duration(DURATION).attr("fill", "hsl(0, 100%, 70%)");
  // sourceNodes.selectAll("text").transition().duration(DURATION).attr("fill", "rgba(255, 255, 255, .5)");

  //update ref
  targetNodesRef.current = targetNodes;
  sourceNodesRef.current = sourceNodes;

  //related links
  let links = link.filter((l) => l.source.text === d.text || l.target.text === d.text);
  let sourceLinks = links.filter((l) => l.source.text === d.text);
  let targetLinks = links.filter((l) => l.target.text === d.text);

  targetLinks.transition().duration(DURATION).attr("stroke", "hsl(0, 100%, 70%)").attr("opacity", 0.8);
  sourceLinks.transition().duration(DURATION).attr("opacity", 0.8);

  targetLinksRef.current = targetLinks;
  sourceLinksRef.current = sourceLinks;
}

function updateKeywordChain({ d, keywordsChain, node, link, unitSize }) {
  if (keywordsChain.length > 0) {
    //other links
    keywordsChain.forEach((keyword, i) => {
      //links
      if (i !== keywordsChain.length - 1) {
        let connectedLink = link.filter((l) => l.source.shortDescription === keywordsChain[i] && l.target.shortDescription === keywordsChain[i + 1]);
        connectedLink
          .transition()
          .duration(DURATION)
          .attr("fill", "hsl(180, 100%, 88%)")
          .attr("stroke-width", 4 * unitSize);
      }

      //texts
      let connectedNode = node.filter((n) => n.text == keywordsChain[i]);
      connectedNode.selectAll("circle").transition().duration(DURATION).attr("fill", "hsl(180, 100%, 93%)");

      //test contents shortdescription
      connectedNode.selectAll("text").text((d) => d.shortDescription || d.text);
      connectedNode.selectAll("text").transition().duration(DURATION).attr("font-size", "2vw").attr("fill", `rgba(255, 255, 255, 0.5)`);
    });

    let connectedLink = link.filter((l) => l.source.text === keywordsChain[keywordsChain.length - 1] && l.target.text === d.text);
    connectedLink
      .transition()
      .duration(DURATION)
      .attr("opacity", 1)
      .attr("stroke", "hsl(180, 100%, 88%)")
      .attr("stroke-width", 4 * unitSize);
  }
}

function updateCurrentNode({ d, node }) {
  let circle = d3.select(`#circle-${d.id}`);
  let text = node.filter((n) => n.text === d.text).selectAll("text");

  //node text element change contents
  // text.text((d) => d.longDescription || d.text);

  let currentR = circle.attr("r");
  circle
    .transition()
    .duration(DURATION)
    .attr("fill", "hsl(180, 100%, 93%)")
    .attr("r", Math.min(currentR * 1.8, 6.0));

  text.transition().duration(DURATION).attr("x", "1vw").attr("y", ".4vw").attr("font-size", "7vw").attr("fill", "white");
  ///max width adjust: if text lengths get too long, next line

  // Set the maximum width for the text
  var maxWidth = 80; // Adjust this value as needed

  // Calculate the number of lines based on the maximum width
  var words = text.text().split(/\s+/);
  var line = [];
  var lineNumber = 0;
  var lineHeight = 6; // Adjust this value as needed
  var dy = parseFloat(text.attr("y"));

  text.text(null);

  var tspan = text
    .append("tspan")
    .attr("x", "1vw")
    .attr("y", ".4vw")
    .attr("dy", dy + "vw");

  for (var i = 0; i < words.length; i++) {
    line.push(words[i]);
    tspan.text(line.join(" "));

    if (tspan.node().getComputedTextLength() > maxWidth) {
      line.pop();
      tspan.text(line.join(" "));
      line = [words[i]];
      tspan = text
        .append("tspan")
        .attr("x", "1vw")
        .attr("y", ".4vw")
        .attr("dy", ++lineNumber * lineHeight + dy + "vw")
        .text(words[i]);
    }
  }
}

//export
export { updateHighlightNode, updateTargetAndSourceNodes, updateKeywordChain, updateCurrentNode };
