import { Fragment, useState, useEffect, useRef, useMemo } from "react";

//hooks
import useSocket from "utils/hooks/socket/vna/useSocketMobile";

//foundations
import dynamic from "next/dynamic";

const Video = dynamic(() => import("foundations/vna/screen/Idle/Video"), { ssr: false });
const Rhizome = dynamic(() => import("foundations/vna/screen/Idle/Rhizome"), { ssr: false });

export default function Idle() {
  const [cycle, setCycle] = useState(0);
  const [showRhizome, setShowRhizome] = useState(false);
  const [rhizomeAttached, setRhizomeAttached] = useState(false);
  //cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setShowRhizome((v) => !v);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout;
    if (!showRhizome) {
      timeout = setTimeout(() => {
        setCycle((c) => c + 1);
        setRhizomeAttached(false);
      }, 1500);
    }
    if (showRhizome) {
      setRhizomeAttached(true);
    }
    return () => timeout && clearTimeout(timeout);
  }, [showRhizome]);

  useEffect(() => {
    if (cycle === 10) {
      //reload
      window.location.reload();
    }
  }, [cycle]);

  return (
    <>
      <Video />
      <Rhizome showRhizome={showRhizome} />
    </>
  );
}
