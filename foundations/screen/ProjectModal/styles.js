import { FlexCenterStyle, WholeContainer, Appear } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  z-index: 300;
  color: #fff;

  ${({ showModal }) =>
    showModal
      ? `
      pointer-events: auto;
    opacity: 1;
  `
      : `
      pointer-events: none;
    opacity: 0;
  `}
`;

export const ModalContainer = styled.div`
  display: flex;
  ${FlexCenterStyle}
  ${WholeContainer} 

  transition: all 0.5s ease-in-out;

  backdrop-filter: blur(0.6vw) brightness(0.8);
  // box-shadow: inset 0 0 1.4rem 0.1rem rgba(255, 255, 255, 0.2);
`;

export const Left = styled.div`
  height: 100%;
  padding-left: 3vw;
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.69, theme.windowHeight * 1.05)}px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: all 0.5s ease-in-out;
`;

export const ImageContainer = styled.div`
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.69, theme.windowHeight * 1.05)}px;
  height: ${({ theme }) => (Math.min(theme.windowWidth * 0.69, theme.windowHeight * 1.05) * 2) / 3}px;

  transition: all 0.5s ease-in-out;
`;

export const PrevImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;
`;

export const CurrImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 1;

  transition: all 0.2s ease-in-out;
`;

export const InformationContainer = styled.div`
  margin-top: 2vw;
  display: flex;
  justify-content: space-between;
  height: 9vw;

  transition: all 0.5s ease-in-out;
`;

export const InfoLeft = styled.div`
  width: 45%;
  h1 {
    font-size: 2.2vw;
    margin-bottom: 0.5vw;
    font-wieght: 600;
    letter-spacing: 0.1vw;
  }
  h2 {
    font-size: 1.8vw;
    font-weight: normal;
    font-style: italic;
    font-weight: 300;
  }
`;

export const InfoRight = styled.div`
  margin-left: 2vw;
  margin-top: 0.5vw;
  width: 45%;
  font-size: 1.2vw;
  font-family: Roboto Serif;
  font-style: italic;
  font-weight: 300;
  line-height: 132.1%;

  p {
    margin-bottom: 1.5vw;
  }
`;

export const SingleKeyword = styled.span`
  margin-right: 1vw;

  font-style: italic;
  font-weight: 300;
  line-height: 138.6%;
  letter-spacing: 0.1vw;
`;

export const Right = styled.div`
  height: 100%;
  width: 18vw;
  padding-right: 3vw;
  padding-left: 8vw;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SingleRelatedProject = styled.div`
  width: 18vw;
  margin: 1vw 0;
  position: absolute;
  cursor: pointer;

  ${({ yIdx }) => `transform: translateY(${-yIdx * 19}vw);`}
  ${({ opacity }) => `opacity: ${opacity};`}
  transition: all 1s ease-in-out;
`;

export const RelatedImage = styled.div`
  width: 18vw;
  height: 12vw;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
  }
`;

export const RelatedExplanation = styled.div`
  h1 {
    font-weight: normal;
    font-size: 1.5vw;
    margin-top: 0.55vw;
    font-weight: 600;
  }
  h2 {
    font-weight: 300;
    font-size: 1.5vw;
  }
`;
