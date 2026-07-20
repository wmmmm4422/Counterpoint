import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

import { PROJECTS, CONNECTIONS, BACKGROUND_CONNECTIONS } from "../data/constant";

//hooks
import useSocket from "utils/hooks/socket/vna/useSocketMobile";

//foundations
import dynamic from "next/dynamic";

const Rhizome = dynamic(() => import("foundations/vna/mobile/Rhizome"), { ssr: false });
const BackgroundRhizome = dynamic(() => import("foundations/vna/mobile/BackgroundRhizome"), { ssr: false });
const UI = dynamic(() => import("foundations/vna/mobile/UI"), { ssr: false });

export default function Map({ projectsData = PROJECTS, connectionData = CONNECTIONS, backgroundConnectionData = BACKGROUND_CONNECTIONS }) {
  //async call deriveKeywords

  const socket = useSocket();

  function handleProjectClickFromRhizome(projectName) {
    //select project with project from projectsdata
    const project = projectsData.find((project) => project.name === projectName);
  }

  return (
    <>
      <S.Container>
        <BackgroundRhizome connectionData={backgroundConnectionData} />
        <Rhizome handleCurrentTarget={() => {}} socket={socket} isVisible={true} projectsData={projectsData} connectionData={connectionData} handleProjectClick={handleProjectClickFromRhizome} />
        <UI socket={socket} />
      </S.Container>
    </>
  );
}
