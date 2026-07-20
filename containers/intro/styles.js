import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { css } from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  display: flex;
  flex-direction: column;
  height: ${({ theme }) => theme.windowHeight * 5}px;

  display: flex;
  flex-direction: column;
  background: black;
  color: white;
  font-family: Barlow;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  z-index: 5 !important;

  h1 {
    z-index: 100;
    font-size: 5rem;
  }

  p {
    ${FlexCenterStyle}
    ${WholeContainer}
    position: fixed;
    top: 0;
    font-size: 2rem;
    color: white;
    z-index: 1000;
    font-family: Roboto Serif;
    font-style: italic;
  }
`;

export const Loading = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  pointer-events: none;
  z-index: 100;
  background: black;
  ${({ show }) => (show ? "opacity: 1" : "opacity: 0")};
  transition: all 0.3s;
`;
