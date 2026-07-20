import { FlexCenterStyle, WholeContainer } from "styles/common";
import styled from "styled-components";

import { Appear } from "styles/common";

export const Container = styled.div`
  width: 100%;
  display: flex;
  top: 0;
  flex-direction: column;
  align-items: center;

  background: black;
  color: #e3e3e3;
  z-index: 20;
  overflow-y: scroll !important;

  &::-webkit-scrollbar {
    display: none;
    width: 0 !important;
  }

  ${({ isVisible }) =>
    isVisible
      ? `
  opacity: 1;
  pointer-events: all;
  transform: translateX(0);
  transform-origin: right;
`
      : `
  opacity: 0;
  pointer-events: none;
  transform: translateX(10%);
  transform-origin: right;
`}
  transition: all 1s ease-in-out;
`;

export const SearchContainer = styled.div`
  margin-top: ${({ theme }) => (theme.windowWidth < 768 ? "6rem" : "8.5rem")};
  display: flex;
  flex-direction: column;

  animation: ${Appear} 0.5s ease-in-out both;
  animation-delay: 0.5s;
`;

export const P = styled.div`
  font-size: 1rem;
  margin-left: 0.1rem;
  font-style: italic;
  pointer-events: none;

  span {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }

  ${({ goUp }) => (goUp ? "transform: translateY(0);" : "transform: translateY(1.7rem);")}
  transition: all 0.3s ease-in-out;
`;

export const SearchInput = styled.input`
  font-family: Barlow;
  margin-top: 0.6rem;
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 500)}px;
  background: transparent;
  outline: 0;
  border: none;
  border-bottom: 2px solid #666;
  font-size: 1.1rem;
  font-weight: 400;
  color: white;

  transition: all 0.5s;

  &:focus {
    border-bottom: 2px solid #e3e3e3;
  }
`;

export const Description = styled.div`
  margin-top: 1.5rem;
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 630)}px;
  font-size: 1rem;
  text-align: center;
  font-style: italic;
  line-height: 168.75%;
  letter-spacing: 0.56px;
`;

export const ListContainer = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 10rem;
  padding-bottom: 10rem;
`;

export const ListItem = styled.div`
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
  width: 100%;
  cursor: pointer;
  width: ${({ theme }) => Math.min(theme.windowWidth * 0.8, 630)}px;
  ${FlexCenterStyle}
  justify-content: space-between;
  ${({ theme }) => theme.windowWidth < 768 && "flex-direction: column;"}

  animation: appear-from-left 0.5s ease-in-out both;
  animation-delay: ${({ idx }) => idx * 0.08 + 0.5}s;
  border-radius: 0.5rem;
  border-bottom: 1px transparent solid;

  @keyframes appear-from-left {
    from {
      transform: translateX(-10%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &:hover {
    // border-bottom: 1px #cbc6e5 solid;
    box-shadow: inset 0 0 0.5rem 0.1rem #cbc6e5;
  }

  transition: all 0.2s ease-in-out;
`;

export const ListItemTitle = styled.div`
  ${({ theme }) => theme.windowWidth < 768 && "width: 100%;"}
  text-align: left;
  font-size: 1.15rem;
  font-weight: 600;
`;

export const ListItemContent = styled.div`
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 300;
  ${({ theme }) => theme.windowWidth < 768 && "width: 100%;"}
  ${({ theme }) => theme.windowWidth < 768 && "margin-top: .2rem;"}
`;
