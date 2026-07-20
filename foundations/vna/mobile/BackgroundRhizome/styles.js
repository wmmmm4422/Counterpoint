import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

import { Appear } from "styles/common";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  top: 0;

  ${({ isScreen }) => !isScreen && "margin-top: 8%;"}

  flex-direction: column;

  background: transparent;
  color: white;
  font-size: 48px;

  svg {
    cursor: pointer;
    ${WholeContainer}
  }

  transition: all 1s ease-in-out;
`;
export const ColorPickers = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 2rem;
  color: white;
  ${FlexCenterStyle}
  flex-direction: column;
  align-items: flex-end;
`;

export const SVG = styled.svg`
  transition: all 0.6s ease-in-out;
`;
