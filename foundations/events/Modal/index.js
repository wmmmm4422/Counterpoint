import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";
import useResize from "utils/hooks/useResize";

const IMG_DB_URL = "https://ied-2023-show.s3.eu-west-1.amazonaws.com/";

export default function Modal({ event, showModal, setShowModal }) {
  function handleClick(e) {
    e.stopPropagation();
    //send to google.com
    if (event.slug.includes("http")) {
      window.open(event.slug, "_blank");
    }

    window.open(`https://2023.rca.ac.uk/students/${event.slug}`, "_blank");
  }

  const [imgLoading, setImgLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (showModal) {
      setImgLoading(true);
    } else {
      setImgSrc(null);
    }
  }, [showModal, event]);

  useEffect(() => {
    if (event) {
      setImgSrc(IMG_DB_URL + event.imgURL);
    }
  }, [event]);

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
      {event && (
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
                alt="sample event"
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
                <h1>{event.name}</h1>
                <h2>{event.studentName}</h2>
              </S.Text>
              {windowWidth < 768 && <S.Tags>{new Date(event.date).toLocaleString()}</S.Tags>}

              {windowWidth < 768 && (
                <S.Link onClick={handleClick}>
                  Learn More at RCA 2023
                  <img src={"/assets/arrow-white.svg"} />
                </S.Link>
              )}
            </S.LeftArray>
            {windowWidth > 768 && (
              <S.RightArray>
                <S.Time>{new Date(event.date).toLocaleString()}</S.Time>
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
