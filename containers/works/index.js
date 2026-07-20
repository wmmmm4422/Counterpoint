import * as S from "./styles";
import { Fragment, useState, useEffect, useRef, useMemo } from "react";

//hooks
import useSocket from "utils/hooks/socket/useSocketMobile";

//foundations
import dynamic from "next/dynamic";

const Rhizome = dynamic(() => import("foundations/works/Rhizome"), { ssr: false });
const ListView = dynamic(() => import("foundations/works/ListView"), { ssr: false });
const Modal = dynamic(() => import("foundations/works/Modal"), { ssr: false });

const Header = dynamic(() => import("foundations/works/Header"), { ssr: false });
const Footer = dynamic(() => import("foundations/works/Footer"), { ssr: false });

const roundUpFloat = (float, roundUp) => {
  return Math.round(float * roundUp) / roundUp;
};

export default function Works({ projectsData, connectionData }) {
  const socket = useSocket();

  const [isRhizome, setIsRhizome] = useState(true);

  const [modalProject, setModalProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleProjectClickFromRhizome(projectName) {
    //select project with project from projectsdata
    const project = projectsData.find((project) => project.name === projectName);
    setModalProject(project || null);
    if (project) setShowModal(true);
  }

  function handleProjectClick(project) {
    setModalProject(project);
    setShowModal(true);
  }

  const [currentTarget, setCurrentTarget] = useState(null);
  useEffect(() => {
    setCurrentTarget(null);
  }, [isRhizome]);

  return (
    <>
      <S.Container>
        <Rhizome
          handleCurrentTarget={(t) => setCurrentTarget(t)}
          socket={socket}
          isVisible={isRhizome}
          projectsData={projectsData}
          connectionData={connectionData}
          handleProjectClick={handleProjectClickFromRhizome}
        />
        <ListView socket={socket} isVisible={!isRhizome} projectsData={projectsData} handleProjectClick={handleProjectClick} />
        <Modal showModal={showModal && modalProject != null} project={modalProject} setShowModal={setShowModal} />
        <Header isRhizome={isRhizome} setIsRhizome={setIsRhizome} />
        <Footer currentTarget={currentTarget} handleTargetClick={handleProjectClickFromRhizome} />
      </S.Container>
    </>
  );
}
