import styled, { css, keyframes } from "styled-components";

export const FlexCenterStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WholeContainer = css`
  position: absolute;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight}px;
`;

export const WholeUIContainer = css`
  position: absolute;
  top: 65px;
  left: 0;
  overflow: hidden;
  width: ${({ theme }) => theme.windowWidth}px;
  height: ${({ theme }) => theme.windowHeight - 65}px;
`;

export const Appear = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
