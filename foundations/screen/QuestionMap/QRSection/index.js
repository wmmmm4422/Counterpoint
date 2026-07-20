import * as S from "./styles";
import { QRCodeSVG } from "qrcode.react";
import useResize from "utils/hooks/useResize";

const qrURL = "https://www.rca-ied-2023.co.uk";

export default function QRSection() {
  const [windowWidth, windowHeight] = useResize();
  return (
    <S.RightWrapper animate={false}>
      <S.RightInner>
        <S.Top>
          <p>
            <b>I</b>nformation
          </p>
          <p>
            <b>E</b>xperience
          </p>
          <p>
            <b>D</b>esign
          </p>
          <br />
          <p>MA1 Public Event</p>
          <h1>COUNTERPOINT</h1>
        </S.Top>
        <S.ImageWrapper>
          <QRCodeSVG value={qrURL} bgColor="transparent" fgColor="white" size={windowWidth * 0.16} />
        </S.ImageWrapper>

        <S.Footer>
          <h2>Scan the QR code</h2>
          <p>to view projects</p>
        </S.Footer>
      </S.RightInner>
    </S.RightWrapper>
  );
}
