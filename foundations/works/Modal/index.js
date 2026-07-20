import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import useResize from "utils/hooks/useResize";

const IMG_DB_URL = "https://ied-2023-show.s3.eu-west-1.amazonaws.com/";

export default function Modal({ project, showModal, setShowModal }) {
  function handleClick(e) {
    e.stopPropagation();
    //send to google.com
    window.open(`https://2023.rca.ac.uk/students/${project.slug}`, "_blank");
  }

  const [imgLoading, setImgLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (showModal) {
      setImgLoading(true);
    } else {
      setImgSrc(null);
    }
  }, [showModal, project]);

  useEffect(() => {
    if (project) {
      setImgSrc(IMG_DB_URL + project.imgURL);
    }
  }, [project]);

  const [windowWidth, windowHeight] = useResize();

  useEffect(() => {
    if (imgLoading) {
      const timeout = setTimeout(() => {
        setImgLoading(false);
      }, 2500);

      return () => clearTimeout(timeout);
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
      {project && (
        <S.ModalContainer
          showModal={showModal}
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(false);
          }}
        >
          <S.ModalCancel
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(false);
            }}
          >
            X
          </S.ModalCancel>
          <S.Image>
            {imgSrc && (
              <img
                style={{
                  opacity: imgLoading ? 0 : 1,
                }}
                onLoad={() => setImgLoading(false)}
                src={imgSrc}
                alt="sample project"
              />
            )}
            {imgLoading && <p>Loading...</p>}
          </S.Image>
          <S.Lower>
            <S.LeftArray
              style={{
                width: windowWidth > 768 ? "50%" : "100%",
              }}
            >
              <S.Text>
                <h1>{project.name}</h1>
                <h2>{project.studentName}</h2>
              </S.Text>
              {windowWidth > 768 && <S.Abstract>{project.abstract}</S.Abstract>}
              {windowWidth < 768 && (
                <S.Tags>
                  {project.keywords.map((keyword, i) => (
                    <S.Tag key={i}>#{keyword.name}</S.Tag>
                  ))}
                </S.Tags>
              )}

              {windowWidth < 768 && (
                <S.Link onClick={handleClick}>
                  Learn More at RCA 2023
                  <img src={"/assets/arrow-white.svg"} />
                </S.Link>
              )}
            </S.LeftArray>
            {windowWidth > 768 && (
              <S.RightArray>
                <S.Tags>
                  {project.keywords.map((keyword, i) => (
                    <S.Tag key={i}>#{keyword.name}</S.Tag>
                  ))}
                </S.Tags>
                <S.Link onClick={handleClick}>
                  Learn More at RCA 2023
                  <img src={"/assets/arrow-white.svg"} />
                </S.Link>
              </S.RightArray>
            )}
          </S.Lower>
        </S.ModalContainer>
      )}
    </S.Container>
  );
}
