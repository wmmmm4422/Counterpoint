import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { css } from "styled-components";

export const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  z-index: 0 !important;
  height: 100vh;
  width: 100%;
  background: black;

  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export const Image = styled.img`
  object-fit: cover;
  position: absolute;
  top: 0;
  opacity: 0.7;

  width: 1345.95px;
  height: 1481.64px;
  left: ${({ theme }) => theme.windowWidth / 2 - 207 - 450}px;
`;
