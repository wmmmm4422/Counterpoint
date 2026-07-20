import * as S from "./styles";
import dynamic from "next/dynamic";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

//foundations
const MainVisual = dynamic(() => import("foundations/intro/MainVisual"), { ssr: false });
const Navigator = dynamic(() => import("foundations/intro/Navigator"), { ssr: false });
const Background = dynamic(() => import("foundations/intro/Background"), { ssr: false });

//hooks
import useResize from "utils/hooks/useResize";

export default function Intro() {
  const [windowWidth, windowHeight] = useResize();

  ///scroller
  useEffect(() => {
    let timeout;
    document.addEventListener("scroll", () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(handleScroll, 5);
    });
    return () => {
      document.removeEventListener("scroll", () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(handleScroll, 5);
      });
    };
  }, [windowWidth, windowHeight]);
  const [scrollPos, setScrollPos] = useState(0);
  const handleScroll = (e) => {
    if (windowHeight === 0) return;
    setScrollPos(Math.round((window.scrollY / windowHeight) * 100) / 100);
  };

  useEffect(() => {
    console.log("Welcome to RCA IED 2023 Website.");
    console.log("Website developed by Jeanyoon Choi, 2023.");
  }, []);

  const [show, setShow] = useState(0);

  return (
    <S.Container>
      {show < 1 && <p>Loading...</p>}
      <Background show={show} windowWidth={windowWidth} scrollPos={scrollPos} handleImageLoaded={() => setShow((s) => s + 0.5)} />
      <MainVisual show={show} scrollPos={scrollPos} handleImageLoaded={() => setShow((s) => s + 0.5)} />
      <Navigator show={show} scrollPos={scrollPos} />
      <S.Loading show={show < 1}></S.Loading>
    </S.Container>
  );
}
