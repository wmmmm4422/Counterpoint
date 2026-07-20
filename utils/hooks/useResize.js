import React, { useState, useEffect, useCallback, useMemo } from "react";

export default function useResize() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onResize = useCallback(() => {
    const documentClientHeight = document.documentElement.clientHeight;
    const documentClientWidth = document.documentElement.clientWidth;
    setWindowHeight(documentClientWidth > 768 ? documentClientHeight : window.innerHeight);
    setWindowWidth(documentClientWidth);
  }, []);

  useEffect(() => {
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return [windowWidth, windowHeight];
}

export function useResizeDebounce() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  const onResize = useCallback(() => {
    const documentClientHeight = document.documentElement.clientHeight;
    const documentClientWidth = document.documentElement.clientWidth;
    setWindowHeight(documentClientWidth > 768 ? documentClientHeight : window.innerHeight);
    setWindowWidth(documentClientWidth);
  }, []);

  useEffect(() => {
    onResize();

    //debounce
    let timeout;
    window.addEventListener("resize", () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(onResize, 100);
    });
    return () =>
      window.removeEventListener("resize", () => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(onResize, 100);
      });
  }, []);

  return [windowWidth, windowHeight];
}
