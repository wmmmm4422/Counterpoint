import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled, { css } from "styled-components";

export const MainVisual = styled.div`
  ${FlexCenterStyle}
  ${WholeContainer}

  height: ${({ theme }) => (theme.windowWidth < 768 ? "90vh" : "98vh")};
  position: fixed !important;
  flex-direction: column;
  justify-content: space-between;
  top: 0;
  bottom: 0;
  opacity: 0;
  margin: auto;
  background-size: cover;
  background-position: center;
  z-index: 3;

  transition: all 0.1s;
`;

export const Image = styled.img`
  position: absolute;
  width: 90%;
  height: 90vh;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  object-fit: contain;
  transform: scaleY(0);

  transition: all 0.1s;
`;

export const Info = styled.div`
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.95, 1500)}px;
  display: flex;
  color: #fff;
  z-indes: 30;

  transition: all 0.1s;
  mix-blend-mode: difference;

  div {
    margin: 4vh 2vw;
    width: 50%;
    display: flex;
    flex-direction: column;

    &:last-child {
      align-items: flex-end;
      text-align: right;

      h3 {
        text-align: right;
      }
    }

    h1 {
      font-size: 1.7rem;
      font-weight: 700;
      letter-spacing: 0.2rem;
      opacity: 0.8;
    }

    h2 {
      font-size: 0.9rem;
      font-family: Roboto Serif;
      font-weight: 200;
      letter-spacing: 0.1rem;
      opacity: 0.7;
      font-style: italic;

      margin-top: 0.8rem;
    }

    h3 {
      font-size: 1.2rem;
      letter-spacing: 0.12rem;
      font-weight: normal;
    }

    img {
      width: 11rem;
      margin-top: -1.3rem;
    }
  }
`;

export const Invisible = styled.div`
  position: fixed;
  opacity: 0;
  pointer-events: none;
`;
