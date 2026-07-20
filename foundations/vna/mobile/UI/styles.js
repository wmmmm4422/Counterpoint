import { FlexCenterStyle, WholeContainer, Appear } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  z-index: 300;
  pointer-events: none;
`;

export const TopLeft = styled.div`
  position: absolute;
  top: 17px;
  left: 10px;
  width: 51px;

  img {
    width: 100%;
  }
`;
export const TopRight = styled.div`
  position: absolute;
  top: 17px;
  right: 10px;
  font-size: 10px;
  font-family: Barlow;
  text-align: right;
  font-weight: bold;
  color: white;
  pointer-events: all;
`;
export const BottomLeft = styled.div`
  position: absolute;
  bottom: 17px;
  left: 10px;
  pointer-events: all;

  img {
    width: 96px;
  }
`;
export const BottomRight = styled.div`
  position: absolute;
  bottom: 17px;
  right: 10px;
  font-size: 10px;
  font-family: Barlow;
  text-align: right;
  font-weight: semi-bold;
  color: white;
  opacity: 0.75;
  pointer-events: all;
`;

export const TopComment = styled.div`
  position: absolute;
  top: 20%;
  width: 70%;
  pointer-events: all;

  ${Appear}
  ${FlexCenterStyle}

  input {
    font-family: Barlow;
    font-size: 15px;
    font-weight: semi-bold;
    width: 100%;
    text-align: center;

    background: transparent;
    outline: 0;
    border: none;
    padding-bottom: 3px;
    border-bottom: 2px solid hsla(280, 100%, 90%, 0.6);
    color: white;

    transition: all 0.3s;

    &:focus {
      border-bottom: 2px solid hsla(280, 100%, 75%, 0.7);
    }

    //placeholder
    &::placeholder {
      color: #888;
      font-style: italic;
    }
  }
`;
