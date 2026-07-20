import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

export const RightWrapper = styled.div`
  // box-shadow: 0 0 0.5vw 0.5vw rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0.2vw) brightness(0.8);
  position: absolute;
  left: 0;
  height: 100%;
  color: white;
  width: 24vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const RightInner = styled.div`
  padding-left: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  h1 {
    font-size: 1.5vw;
  }
`;

export const Top = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.7vw;
    font-weight: lighter;
  }
  h1 {
    font-size: 1.7vw;
  }
  margin: 2vw 0;
  margin-top: 4vw;
`;

export const ImageWrapper = styled.div`
  max-width: 10vw;

  img {
    width: 100%;
  }
`;

export const Footer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin: 2vw 0;
  margin-bottom: 7vw;

  p {
    font-size: 1.7vw;
    font-weight: lighter;
  }

  h2 {
    font-size: 1.7vw;
  }
`;
