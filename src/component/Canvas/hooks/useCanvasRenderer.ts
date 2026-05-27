import { useEffect } from "react";
import type { CanvasRendererProps } from "../types";
import { drawSelection } from "../rendering/drawSelection";
import { useEditorStore } from "../../../store/useEditorStore";
import { handleRulerVisibility } from "../rendering/handleRulerVisibility";
import useRuler from "./useRuler";
import { renderCanvasBackground } from "../rendering/renderCanvasBackground";
import { renderElements } from "../rendering/renderElements";
import { handleGridVisibility } from "../rendering/handleGridVisibility";

export function useCanvasRenderer({
  canvasRef,
  canvasConfig,
  elements,
  selectedElement,
}: CanvasRendererProps) {
  const { rulerStatus, gridStatus, strokeStyle, lineWidth } = useEditorStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvasConfig) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderCanvasBackground({ ctx, canvas, canvasConfig });

    renderElements({ elements, ctx, strokeStyle, lineWidth });

    handleRulerVisibility({ canvas, ctx, rulerStatus });

    handleGridVisibility({ canvas, ctx, gridStatus });

    if (selectedElement) drawSelection(ctx, selectedElement);
  }, [
    elements,
    canvasConfig,
    selectedElement,
    rulerStatus,
    canvasRef,
    gridStatus,
  ]);

  useRuler({ canvasRef, canvasConfig, rulerStatus });
}
