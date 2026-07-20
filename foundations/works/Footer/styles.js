import { FlexCenterStyle } from "styles/common";
import styled from "styled-components";
import { Appear } from "styles/common";

export const Container = styled.div`
  z-index: 100;
  width: 100%;
  position: fixed;
  height: 4rem;
  padding-bottom: 0.5rem;
  bottom: 0;
  left: 0;
  right: 0;
  transition: all 0.5s;
  pointer-events: all;

  ${FlexCenterStyle}
  justify-content: space-between;
  align-items: flex-end;

  animation: ${Appear} 1s ease-in-out both;
  animation-delay: 1s;

  backdrop-filter: blur(1rem) brightness(1.5);
`;

export const Center = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  font-size: 1.5rem;
  font-style: italic;
  ${FlexCenterStyle}
  cursor: pointer;
  z-index: 4;
  text-align: center;
  font-family: Roboto Serif;

  ${({ show }) => (show ? "opacity: 1;" : "opacity: 0; pointer-events: none;")}
  transition: all 0.5s;
`;

export const Texts = styled.div`
  position: absolute;
  cursor: pointer;
  padding-bottom: 0.5rem;
  right: 0;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 4vw;
  text-align: right;

  ${({ show }) => (show ? "opacity: 1;" : "opacity: 0; pointer-events: none;")}
  transition: all 0.5s;

  h1 {
    color: white;
    font-size: 1rem;
    letter-spacing: 0.03rem;
    font-weight: normal;
    b {
      font-weight: bold;
      opacity: 1;
    }
  }
`;
