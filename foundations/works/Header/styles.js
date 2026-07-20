import { FlexCenterStyle } from "styles/common";
import styled from "styled-components";

import { Appear } from "styles/common";

export const Container = styled.div`
  z-index: 100;
  width: 100%;
  position: fixed;
  height: ${({ theme }) => (theme.windowWidth < 768 ? "4rem" : "7rem")};
  padding-top: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0.5s;
  pointer-events: all;

  ${FlexCenterStyle}
  flex-direction: column;
  backdrop-filter: blur(1rem) brightness(2);

  animation: ${Appear} 1s ease-in-out both;
  animation-delay: 0.5s;
`;

export const Upper = styled.div`
  font-size: 1rem;
  font-weight: bold;
  margin-top: 0.8rem;
  ${FlexCenterStyle}
  justify-content: space-between;

  width: 100%;
`;

export const Center = styled.div`
  ${FlexCenterStyle}
  flex-direction: column;
`;

export const UpperCenter = styled.div`
  cursor: pointer;
  font-size: ${({ theme }) => (theme.windowWidth < 768 ? "1.2rem" : "1.7rem")};
  margin-left: ${({ theme }) => (theme.windowWidth < 768 ? ".4rem" : ".6rem")};
  font-weight: bold;

  font-style: italic;
  ${FlexCenterStyle}
  letter-spacing: 0.1rem;
`;

export const CenterText = styled.div`
  width: 30vw;
  margin: 0 0.1vw;
`;

export const List = styled.div`
  margin-top: 1.5rem;
  ${FlexCenterStyle}
  width: 100%;
`;

export const Item = styled.div`
  font-size: ${({ theme }) => (theme.windowWidth < 768 ? ".9rem" : "1.1rem")};
  margin: 0 4vw;
  transition: all 0.3s;
  cursor: pointer;
  font-style: italic;
  font-weight: lighter;
  width: 10vw;
`;
