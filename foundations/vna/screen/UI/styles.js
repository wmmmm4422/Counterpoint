import { FlexCenterStyle, WholeContainer, Appear } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  z-index: 300;
  pointer-events: none;
  font-family: Barlow;
  font-weight: bold;
  font-size: 1.3vw;
  letter-spacing: 0.07vw;
`;

export const TopLeft = styled.div`
  position: absolute;
  top: 1.5vw;
  left: 2vw;
`;

export const TopRight = styled.div`
  position: absolute;
  top: 1.5vw;
  right: 2vw;

  display: flex;
  flex-direction: row;
`;

export const BottomLeft = styled.div`
  position: absolute;
  bottom: 1.5vw;
  left: 2vw;
`;

export const BottomRight = styled.div`
  position: absolute;
  bottom: 1.5vw;
  right: 2vw;
  display: flex;
  align-items: flex-end;

  div {
    text-align: right;
    // margin-right: 1.5vw;
  }
`;

export const Logo = styled.div`
  height: 2.9vw;
  margin-left: 1.7vw;
  margin-right: 0.7vw;
  img {
    width: auto;
    height: 100%;
  }
`;

export const QRWrapper = styled.div``;
