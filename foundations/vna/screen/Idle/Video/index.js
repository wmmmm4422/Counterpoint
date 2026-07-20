import { Fragment, useState, useEffect, useRef, useMemo } from "react";

import { PROJECTS, CONNECTIONS, BACKGROUND_CONNECTIONS } from "containers/vna/data/constant";

import * as S from "./styles";
//foundations
import dynamic from "next/dynamic";

const Rhizome = dynamic(() => import("foundations/vna/mobile/Rhizome"), { ssr: false });
const BackgroundRhizome = dynamic(() => import("foundations/vna/mobile/BackgroundRhizome"), { ssr: false });

export default function El() {
  return (
    <S.Container>
      <video src={`/assets/vna/video/vid1.mp4`} type="video/mp4" autoPlay="autoplay" loop playsInline muted preload="auto" controls={false} />
    </S.Container>
  );
}
