import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  

  flex-direction: column;
  background: black;
  color: white;
  overflow-y: hidden;
  overflow-x: hidden;
`;

export const BackgroundContainer = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
