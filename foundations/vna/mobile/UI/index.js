import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

const SENTENCES = ["Which project do you resonate with?", "How do you connect with Non-Humans?", "What is your response to Vibrant Matters?"];

export default function UI({ socket }) {
  const [word, setWord] = useState("");
  const [currSentence, setCurrSentence] = useState(0);

  useEffect(() => {
    let timeout = setInterval(() => {
      setCurrSentence((curr) => (curr + 1) % SENTENCES.length);
    }, 4000);
    return () => timeout && clearInterval(timeout);
  }, []);

  useEffect(() => {
    try {
      if (socket && socket.current) {
        socket.current.emit("vna-keyword-input", word);
      }
    } catch (e) {
      console.log(e);
    }
  }, [word]);

  return (
    <S.Container>
      <S.TopLeft>
        <img src="/assets/vna/logo/vna.svg" />
      </S.TopLeft>
      <S.TopRight onClick={() => window.open("https://www.vam.ac.uk/event/DP8y2304L9l/rca-showcase2023", "_blank")}>
        <p>DIGITAL DESIGN</p>
        <p>WEEKEND 2023</p>
        <br />
        <p>X</p>
        <br />
        <p>INFORMATION</p>
        <p>EXPERIENCE DESIGN</p>
      </S.TopRight>
      <S.BottomLeft
        style={{
          marginBottom: "-3px",
        }}
        onClick={() => window.open("https://www.rca.ac.uk/", "_blank")}
      >
        <img src="/assets/vna/logo/rca.png" alt="Royal College of Art" />
      </S.BottomLeft>
      <S.BottomRight>
        <p onClick={() => window.open("https://2023.rca.ac.uk/students/jeanyoon-choi/", "_blank")}>Credit: Jeanyoon</p>
        <p onClick={() => window.open("https://2023.rca.ac.uk/students/yue-song/", "_blank")}>Choi, Yue Song</p>
      </S.BottomRight>

      <S.TopComment>
        <input
          type="text"
          placeholder={SENTENCES[currSentence]}
          value={word}
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
      </S.TopComment>
    </S.Container>
  );
}
