import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

const IMG_DB_URL = "https://ied-2023-show.s3.eu-west-1.amazonaws.com/";

export default function Modal({ currentProject, handleProjectClick, showModal, setShowModal }) {
  const [transition, setTransition] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [imgURL, setImgURL] = useState(false);

  useEffect(() => {
    setImgLoading(true);
    if (!currentProject) return;
    setTransition(true);
    const timeoutA = setTimeout(() => {
      setImgURL(currentProject.imgURL);
    }, 200);
    const timeout = setTimeout(() => {
      setTransition(false);
    }, 300);
    return () => {
      clearTimeout(timeoutA);
      clearTimeout(timeout);
    };
  }, [currentProject]);

  useEffect(() => {
    if (imgLoading) {
      const timeoutA = setTimeout(() => {
        setImgLoading(false);
      }, 300);
      return () => {
        clearTimeout(timeoutA);
      };
    }
  }, [imgLoading]);

  return (
    <S.Container
      showModal={showModal}
      onClick={(e) => {
        e.stopPropagation();
        setShowModal(false);
      }}
    >
      <S.ModalContainer
        showModal={showModal}
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}
      >
        {currentProject && (
          <S.Left>
            <S.ImageContainer>
              <S.CurrImg
                onLoad={() => setImgLoading(false)}
                style={{
                  opacity: transition || imgLoading ? 0 : 1,
                }}
                src={IMG_DB_URL + imgURL}
                alt="Student project"
              />
            </S.ImageContainer>
            <S.InformationContainer>
              <S.InfoLeft>
                <h1>{currentProject.name}</h1>
                <h2>{currentProject.studentName}</h2>
              </S.InfoLeft>
              <S.InfoRight>
                <p> {currentProject.abstract}</p>
                <p>
                  {currentProject.keywords.map((keyword, i) => (
                    <S.SingleKeyword key={i}>{"#" + keyword.name}</S.SingleKeyword>
                  ))}
                </p>
              </S.InfoRight>
            </S.InformationContainer>
          </S.Left>
        )}

        {currentProject && <RightCarousel relatedProjects={currentProject.relatedProjects} handleProjectClick={handleProjectClick} />}
      </S.ModalContainer>
    </S.Container>
  );
}

function RightCarousel({ relatedProjects, handleProjectClick }) {
  const [currentLoc, setCurrentLoc] = useState(0);

  useEffect(() => {
    if (relatedProjects.length >= 3) {
      const interval = setInterval(() => {
        setCurrentLoc((loc) => (loc + 1) % relatedProjects.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [relatedProjects]);

  return (
    <S.Right>
      {relatedProjects.map((prj, i) => {
        const yIdx =
          relatedProjects.length >= 3
            ? currentLoc - i > relatedProjects.length / 2
              ? currentLoc - i - relatedProjects.length
              : currentLoc - i < -relatedProjects.length / 2
              ? currentLoc - i + relatedProjects.length
              : currentLoc - i
            : -i;
        const opacity = Math.abs(yIdx) >= 3 ? 0 : 1;

        return (
          <S.SingleRelatedProject
            key={i}
            yIdx={yIdx}
            opacity={opacity}
            onClick={(e) => {
              e.stopPropagation();
              handleProjectClick(prj.name);
            }}
          >
            <S.RelatedImage>
              <img src={IMG_DB_URL + prj.imgURL} alt="sample project" />
            </S.RelatedImage>
            <S.RelatedExplanation>
              <h1>{prj.name}</h1>
              <h2>{prj.studentName}</h2>
            </S.RelatedExplanation>
          </S.SingleRelatedProject>
        );
      })}
    </S.Right>
  );
}
