import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import useResize from "utils/hooks/useResize";
import Image from "next/image";

import { PROJECTS } from "containers/vna/data/constant";

export default function Work({ currKeyword, workDeanimated }) {
  const [windowWidth, windowHeight] = useResize();

  const [currProjectIdx, setCurrProjectIdx] = useState(0);
  const [centerKeywordVisible, setCenterKeywordVisible] = useState(false);

  useEffect(() => {
    let projIdx = -1;
    //first find if project name itself is a keyword
    projIdx = PROJECTS.findIndex((project) => {
      return project.name === currKeyword;
    });
    if (projIdx === -1) {
      projIdx = PROJECTS.findIndex((project) => {
        return project.relatedKeywords.includes(currKeyword);
      });
    }
    setCurrProjectIdx(projIdx);

    setCenterKeywordVisible(true);
    let timeout = setTimeout(() => {
      setCenterKeywordVisible(false);
    }, 2000);
    return () => timeout && clearTimeout(timeout);
  }, [currKeyword]);

  const [imgURL, setImgURL] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (currProjectIdx === -1) return;
    setTransitioning(true);
    let timeout = setTimeout(() => {
      setImgURL(PROJECTS[currProjectIdx].imgURL);
      setTransitioning(false);
    }, 200);
    return () => timeout && clearTimeout(timeout);
  }, [currProjectIdx]);

  return (
    <>
      <S.Background workDeanimated={workDeanimated} transitioning={transitioning}>
        <Image src={imgURL} alt={PROJECTS[currProjectIdx].name} width={windowWidth * 1.15} height={(windowWidth * 1.15 * 9) / 16} />
      </S.Background>
      <S.Container workDeanimated={workDeanimated}>
        <S.Left>
          {PROJECTS[currProjectIdx].relatedKeywords.map((keyword, idx) => {
            return (
              <S.Keyword key={idx} highlight={currKeyword === keyword || PROJECTS[currProjectIdx].name === currKeyword}>
                {keyword}
              </S.Keyword>
            );
          })}
        </S.Left>
        <S.Center transitioning={transitioning}>
          <Image src={imgURL} alt={PROJECTS[currProjectIdx].name} width={windowWidth * 0.6} height={windowWidth * 0.3375} />
        </S.Center>
        <S.Right>
          <p>{PROJECTS[currProjectIdx].abstract}</p>
          <S.Loc>
            <img src={PROJECTS[currProjectIdx].locURL} />
          </S.Loc>
        </S.Right>

        <S.Bottom>{PROJECTS[currProjectIdx].name}</S.Bottom>
        <S.CenterKeyword visible={centerKeywordVisible}>{currKeyword}</S.CenterKeyword>
      </S.Container>
    </>
  );
}
