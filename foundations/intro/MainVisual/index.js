import * as S from "./styles";
import { useState, useEffect } from "react";
import { useSpring } from "react-spring";
import useResize from "utils/hooks/useResize";
import * as easings from "d3-ease";

export default function MainVisual({ show, scrollPos, handleImageLoaded }) {
  ///main visual identity
  const [mainVisualIntensity, setMainVisualIntensity] = useState(0);
  const [windowWidth, windowHeight] = useResize();

  useSpring({
    from: { progress: 0 },
    to: { progress: show === 1 ? 1 : 0 },
    config: { duration: 2000, easing: easings.easeCubicIn },
    onChange: ({ value }) => {
      setMainVisualIntensity(value.progress);
    },
    onRest: () => {},
  });

  useEffect(() => {
    setMainVisualIntensity(Math.max(1 - scrollPos * 0.33, 0));
  }, [scrollPos]);

  return (
    <S.MainVisual
      style={{
        opacity: show === 1 ? mainVisualIntensity : 0,
      }}
    >
      <S.Image
        onLoad={handleImageLoaded}
        src="/assets/Counterpoint.png"
        style={{
          transform: `scaleY(${(mainVisualIntensity * 1) ** 4})`,
        }}
      />

      <S.Info
        style={{
          opacity: Math.max(0.9 - (1 - Math.min(mainVisualIntensity + 0.1, 1)) * 5, 0),
        }}
      >
        <div>
          <h1>RCA IED MA1</h1>
          {windowWidth > 768 && <h2>Information Experience Design</h2>}
        </div>
        <div>
          {windowWidth > 768 && <img src="/assets/RCALogo.png" />}
          {windowWidth < 768 && <h2>Information Experience Design</h2>}
        </div>
      </S.Info>

      <S.Info
        style={{
          opacity: Math.max(0.9 - (1 - Math.min(mainVisualIntensity + 0.1, 1)) * 2, 0),
          alignItems: "flex-end",
        }}
      >
        <div>
          <h3>RCA Kensington</h3>
          <h3>First Floor</h3>
          <h2>Enter from Royal Albert Hall</h2>
        </div>
        <div>
          <h3>30th June</h3>
          <h3>to 3rd July</h3>
          <h2
          // style={{
          //   marginTop: ".6rem",
          // }}
          >
            12pm - 6pm
          </h2>
        </div>
      </S.Info>
      <S.Invisible>
        <h1>RCA IED 2023 Show</h1>
        <h2>RCA 2023 Summer Show, Graduation Show</h2>
        <h3>Royal College of Art Kensington Campus</h3>
        <h4>Enter from the Royal Albert Hall</h4>
        <h4>Royal College of Art Information Experience Design</h4>
        <h2>Website Developed and Programmed by Jeanyoon Choi, RCA IED 2023</h2>
        <h2>Website Designed by UI designer Yue Song, RCA IED 2023</h2>
      </S.Invisible>
    </S.MainVisual>
  );
}
