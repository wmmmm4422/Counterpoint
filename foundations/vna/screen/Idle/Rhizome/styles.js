import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  background: black;

  opacity: 0;
  cursor: none;

  ${({ showRhizome }) =>
    showRhizome &&
    `    transform: translateY(0);
      opacity: 1;`}

  transition: all 1s;

  @keyframes appear-rhizome {
    from {
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  animation: appear-rhizome 0.5s;
`;
