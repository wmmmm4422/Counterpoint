import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

//resize
import { useResizeDebounce } from "utils/hooks/useResize";

//libraries
import * as Tone from "tone";
import * as d3 from "d3";

//foundation
import QRSection from "./QRSection";

//helper
import { DATA_NODES_LINKS } from "./data";
import { initCleanUp, initCreateSimulation, initMarkerStyling, initLinkStyling, initNodeStyling } from "./helper/init";
import { updateTargetAndSourceNodes, updateKeywordChain, updateCurrentNode, updateHighlightNode } from "./helper/update";

const getRandom = (a, b) => Math.random() * (b - a) + a;
const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];

export default function QuestionMap({ connectionData = DATA_NODES_LINKS, toneOn = true }) {
  ////////////
  ///d3///
  ////////////

  const [currentTarget, setCurrentTarget] = useState("Double Thinking");
  const svgRef = useRef();
  const [intervalTime, setIntervalTime] = useState(1500);

  //size
  const [windowWidth, windowHeight] = useResizeDebounce();

  //d3-related states
  const simulationRef = useRef(null);
  const linkRef = useRef(null);
  const nodeRef = useRef(null);
  const [reset, setReset] = useState(true);

  useEffect(() => {
    if (!reset) return;
    init();
  }, [connectionData, windowWidth, windowHeight, reset]);

  useEffect(() => {
    if (toneOn) setIntervalTime(1500);
    if (!toneOn) setIntervalTime(5000);
  }, [toneOn]);

  function init() {
    const types = ["isCycle", "isNotCycle"];
    const color = d3.scaleOrdinal(types, ["hsl(180, 100%, 70%)", "hsl(180, 100%, 70%)"]);
    const width = windowWidth;
    const height = windowHeight;
    const svg = d3.select(svgRef.current);
    const links = connectionData.links.map((d) => Object.create(d));
    const nodes = connectionData.nodes.map((d) => Object.create(d));

    //cleanup
    initCleanUp({ svg });
    //marker default styling
    initMarkerStyling({ svg, types, color, width, height });

    //create simulation
    const simulation = initCreateSimulation({ nodes, links, width, height });
    //link styling
    const link = initLinkStyling({ svg, links, color, width, height });
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
  ////////////
  ///interaction///
  ////////////
  const [keywordsChain, setKeywordsChain] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    //current target
    if (currentTarget == "") return;
    setQuestion(connectionData.nodes.filter((n) => n.text === currentTarget)[0].longDescription || "");
    let connected = connectionData.links.filter((l) => l.source === currentTarget);
    let connectedNodes = [...new Set(connected.map((l) => l.target))];
    let target = getRandomFromArray(connectedNodes);

    if (toneOn) triggerTone();

    const timeout = setTimeout(() => {
      setReset(false);
      setCurrentTarget(target);
      setKeywordsChain((keywordsChain) => [...keywordsChain, currentTarget]);
    }, intervalTime);
    return () => clearTimeout(timeout);
  }, [currentTarget]);

  useEffect(() => {
    if (keywordsChain.length >= 8 && toneOn) {
      handleReset();
    }
  }, [keywordsChain, toneOn]);

  const [loopIteration, setLoopIteration] = useState(0);

  function handleReset() {
    if (loopIteration >= 8) {
      window.location.reload();
    }

    setLoopIteration((i) => i + 1);
    setKeywordsChain([]);
    setQuestion("");
    setReset(true);
    setCurrentTarget("");
    const timeout = setTimeout(() => {
      setCurrentTarget(getRandomFromArray(connectionData.nodes.map((n) => n.text)));
    }, intervalTime);
  }

  const targetNodesRef = useRef(null);
  const sourceNodesRef = useRef(null);
  const targetLinksRef = useRef(null);
  const sourceLinksRef = useRef(null);

  useEffect(() => {
    let node = nodeRef.current;
    let simulation = simulationRef.current;
    let link = linkRef.current;
    let unitSize = windowWidth * 0.001;

    if (node && simulation) {
      const nodes = node.filter((d) => d.text === currentTarget);
      nodes.each((d) => {
        d.x = 0;
        d.y = 0;

        /////TARGET AND SOURCE NODES //////////////////////////////////
        updateTargetAndSourceNodes({ data: connectionData, d, node, link, targetNodesRef, sourceNodesRef, targetLinksRef, sourceLinksRef });
        ///KEYWORD CHAIN MANAGEMENT////////////////////////////////
        updateKeywordChain({ d, keywordsChain, node, link, unitSize });
        //get current r
        updateCurrentNode({ d, node });
      });
    }
  }, [connectionData, currentTarget, keywordsChain, windowWidth, windowHeight]);

  function triggerTone() {
    const NOTES = [
      ["E4", "C5", "E5", "G5"],
      ["G5", "E5", "C5", "A4"],
      ["A4", "C5", "A4", "F5"],
      ["F5", "D5", "B4", "G4"],
      ["G4", "B4", "G4", "E5"],
      ["E5", "C5", "A4", "F4"],
      ["F4", "A4", "F4", "D5"],
      ["D5", "B4", "G4", "E4"],
    ];

    const OTHER_NOTES = [
      ["G3", "C4", "E4", "G4"],
      ["F3", "A3", "C4", "F4"],
      ["F3", "A3", "C4", "F4"],
      ["E3", "G3", "B3", "E4"],
      ["E3", "G3", "B3", "E4"],
      ["D3", "F3", "A3", "D4"],
      ["D3", "F3", "A3", "D4"],
      ["C3", "E3", "G3", "C4"],
    ];
    try {
      const synth = new Tone.MonoSynth().toDestination();

      const now = Tone.now();
      let iteration = keywordsChain.length;
      if (iteration >= 8) return;
      let targetNotes = NOTES[iteration % NOTES.length];
      targetNotes.forEach((note, i) => {
        if (i < 3) synth.triggerAttackRelease(note, "32n", now + 0.14 * i);
        else synth.triggerAttackRelease(note, "16n", now + 0.14 * i);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <S.Container>
      {/* <Background windowWidth={windowWidth} /> */}
      <svg
        ref={svgRef}
        style={{
          marginLeft: "7vw",
        }}
      />
      <S.Question>{question}</S.Question>

      <S.Overlap show={currentTarget === ""}>What is IED?</S.Overlap>
      <QRSection />
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
