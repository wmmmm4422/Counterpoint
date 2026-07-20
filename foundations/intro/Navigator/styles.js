import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { css } from "styled-components";

export const MainVisual = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}
  height: ${({ theme }) => (theme.windowWidth < 768 ? "82vh" : "90vh")};
  position: fixed !important;
  flex-direction: column;
  justify-content: space-between;
  bottom: 0;
  margin: auto;
  background-size: cover;
  background-position: center;
  z-index: 3;
  font-family: Barlow;
  color: white;

  h1,
  h2,
  h3 {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-size: 1.2rem;
  }

  transition: all 0.1s;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
`;

export const Upper = styled.div`
  ${FlexCenterStyle}
  flex-direction: column;
  margin-top: 0vh;

  h1 {
    color: #fff;
    font-size: 1.7rem;
    font-weight: 700;
    letter-spacing: 0.6rem;
  }

  h2 {
    color: #fff;
    font-size: 1rem;
    line-height: 140%;
    font-style: italic;
    letter-spacing: 0.1rem;
    font-weight: normal;
    text-align: center;
    ${FlexCenterStyle}

    width: ${({ theme }) => Math.min(theme.windowWidth * 0.88, 800)}px;
  }
`;

export const ButtonContainer = styled.div`
  ${FlexCenterStyle}
  flex-direction: column;
  font-family: Roboto Serif;
  margin-top: 0vh;
  margin-bottom: 5vh;
`;

export const Button = styled.div`
  position: relative;
  font-size: 3rem;
  height: 3.2rem;
  width: 13rem;
  font-style: italic;
  margin: 3vh 0;
  text-align: center;
  ${FlexCenterStyle}
  cursor: pointer;
  letter-spacing: 0.3rem;

  transition: all 0.1s;
`;

export const ArrowRight = styled.img`
  position: absolute;
  left: 15rem;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const ArrowLeft = styled.img`
  position: absolute;
  right: 15.5rem;
  top: 0;
  bottom: 0;
  margin: auto;
`;

export const Lower = styled.div`
  ${FlexCenterStyle}
  flex-direction: column;
  margin-bottom: 3vh;

  transition: all 0.1s;

  h1 {
    margin-bottom: 1rem;
    font-weight: 500;
    text-align: center;
    font-size: 1.1rem;
    opacity: 0.5;
  }

  h3 {
    font-size: 0.77rem;
    line-height: 1.3;
    opacity: 0.8;
    letter-spacing: 0.05rem;
    font-weight: normal;
    width: ${({ theme }) => Math.min(theme.windowWidth * 0.9, 900)}px;
    text-align: center;

    a {
      text-decoration: none;
      cursor: pointer;
    }
  }
`;
