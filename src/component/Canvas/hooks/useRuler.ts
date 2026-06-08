import { useEffect } from "react";
import { renderRuler } from "../rendering/renderRuler";
import type { rulerProps } from "../types";

const useRuler = ({ canvasRef, canvasConfig, rulerStatus }: rulerProps) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");

    const handlePointer = function (e: MouseEvent) {
      if (!ctx || !canvas) return;
      if (rulerStatus) renderRuler(e, ctx, canvas);
    };
    document.addEventListener("mousemove", handlePointer);
    return () => {
      document.removeEventListener("mousemove", handlePointer);
    };
  }, [canvasRef, canvasConfig, rulerStatus]);
};

export default useRuler;
