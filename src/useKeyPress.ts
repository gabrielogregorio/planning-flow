import { useEffect, useRef } from "react";

export const useKeyPress = (callback: (event: KeyboardEvent) => void) => {
  const refCallback = useRef(callback);

  useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleKeyDownEvent(event: KeyboardEvent) {
      refCallback.current(event);
    }
    window.addEventListener("keypress", handleKeyDownEvent);

    return () => {
      window.removeEventListener("keypress", handleKeyDownEvent);
    };
  }, [refCallback]);
};
