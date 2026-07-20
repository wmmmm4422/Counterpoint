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

export const Image = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 3vw;
  position: relative;
  width: 30vw;

  img {
    position: absolute;
    width: 100%;
    // bottom: -2.1rem;
    // left: -1.3rem;
  }
`;

export const Texts = styled.div`
  position: absolute;
  padding-bottom: 0.5rem;
  right: 0;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 4vw;
  text-align: right;

  cursor: pointer;
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
