import { FlexCenterStyle, WholeContainer, Appear } from "styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${WholeContainer}
  ${FlexCenterStyle}
  flex-direction: column;
  z-index: 300;

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
  flex-direction: column;
  ${FlexCenterStyle}

  position: relative;

  width: ${({ theme }) => Math.min(Math.min(theme.windowWidth * 0.9, 600) * 0.9, Math.min(theme.windowHeight * 0.8, 580))}px;
  padding: 1.8rem 5vw;
  background: transparent;

  box-shadow: inset 0 0 1.4rem 0.1rem rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  z-index: 500;

  ${({ showModal }) => (showModal ? `opacity: 1;` : `opacity: 0;`)}
  ${({ showModal }) => showModal && "backdrop-filter: blur(.8rem) brightness(0.6);"}

  transition: all 0.2s ease-in-out;
`;

export const ModalCancel = styled.div`
  position: absolute;
  top: -0.65rem;
  right: -0.65rem;
  width: 1.8rem;
  height: 1.8rem;
  font-size: 0.9rem;

  ${FlexCenterStyle}

  border-radius: 50%;
  box-shadow: inset 0 0 1.3rem hsla(0, 100%, 50%, 1);
  backdrop-filter: blur(3rem);
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

export const Image = styled.div`
  width: ${({ theme }) => Math.min(Math.min(theme.windowWidth * 0.9, 600) * 0.9, Math.min(theme.windowHeight * 0.8, 580))}px;
  height: ${({ theme }) => (Math.min(Math.min(theme.windowWidth * 0.9, 600) * 0.9, Math.min(theme.windowHeight * 0.8, 580)) * 2) / 3}px;
  overflow: hidden;
  margin-bottom: 1rem;
  position: relative;

  ${FlexCenterStyle}

  p {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${FlexCenterStyle}
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s;
  }
`;

export const Lower = styled.div`
  display: flex;
  width: ${({ theme }) => Math.min(Math.min(theme.windowWidth * 0.9, 600) * 0.9, Math.min(theme.windowHeight * 0.8, 580))}px;
  // flex-direction: column;
  ${FlexCenterStyle}
`;

export const LeftArray = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const RightArray = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

export const Text = styled.div`
  h1 {
    font-size: 1.1rem;
    font-weight: 600;
  }

  h2 {
    margin-top: 0.5rem;
    font-size: 1.1rem;

    font-weight: 300;
  }
`;

export const Abstract = styled.div`
  font-style: italic;
  text-align: left;

  font-family: Roboto Serif;
  font-weight: 300;
  font-size: 0.8rem;
  line-height: 132.1%;
  margin-top: 1rem;
  letter-spacing: 0.1rem;
`;

export const LowerUpper = styled.div`
  display: flex;
  width: 100%;
`;

export const Tags = styled.div`
  font-family: Roboto Serif;
  font-weight: 300;
  font-size: 0.7rem;
  line-height: 138.1%;
  letter-spacing: 0.1rem;
  font-style: italic;

  margin-top: 1rem;
  width: ${({ theme }) => (theme.windowWidth > 768 ? "12.5rem" : "100%")};
`;

export const Time = styled.div`
  font-family: Roboto Serif;
  font-weight: 300;
  font-size: 1rem;
  line-height: 138.1%;
  letter-spacing: 0.1rem;
  font-style: italic;

  width: ${({ theme }) => (theme.windowWidth > 768 ? "12.5rem" : "100%")};
`;
export const Tag = styled.div`
  margin-right: 0.5rem;
`;

export const Link = styled.div`
  text-align: left;
  margin-top: 1rem;
  cursor: pointer;
  width: 12.5rem;

  font-style: italic;
  border-bottom: 1px solid white;

  //no line break
  white-space: nowrap;

  img {
    width: 1rem;
    margin-left: 0.5rem;
  }
`;
