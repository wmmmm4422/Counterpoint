import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  background: black;
  color: white;

  transition: all 0.5s;

  svg {
    z-index: 0;
  }
`;

export const Question = styled.div`
  position: absolute;
  padding: 1vw 0;
  bottom: 0;
  height: 4vw;
  z-index: 100;
  backdrop-filter: blur(0.2vw) brightness(0.8);
  width: 100%;
  text-align: center;
  ${FlexCenterStyle}
  font-size: 2.6vw;
  font-family: Bebas Neue;
  ${FlexCenterStyle}
`;

export const Overlap = styled.div`
  font-size: 6vw;

  font-family: Bebas Neue;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  ${FlexCenterStyle}
  pointer-events: none;

  ${({ show }) => (show ? "opacity: 1;" : "opacity: 0;")}
  transition: all 0.5s;
`;
