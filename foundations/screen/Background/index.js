import { useState } from "react";
import * as S from "./styles";

export default function Background() {
  const [show, setShow] = useState(false);

  return (
    <S.BackgroundImage show={show}>
      <S.Image src="/assets/Horses.png" alt="main-image" onLoad={() => setShow(true)} />
    </S.BackgroundImage>
  );
}
