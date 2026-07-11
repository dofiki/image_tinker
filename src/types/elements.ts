export interface BaseElement {
  name: string | null;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  visibilityStatus: boolean;
  blendMode: GlobalCompositeOperation;
}

export interface RectElement extends BaseElement {
  type: "rect";
  fillStyle: string;
  strokeStyle: string;
}

export interface CircleElement extends BaseElement {
  type: "circle";
  lineWidth: number;
  strokeStyle: string;
  radius: number;
  startAngle: number;
  endAngle: number;
}

export interface LineElement extends BaseElement {
  type: "line";
  lineWidth: number;
  strokeStyle: string;
  moveTo: [number, number];
  lineTo: [number, number];
}

export interface CropProperies {
  sx?: number;
  sy?: number;
  width?: number;
  height?: number;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  blur?: number;
  saturate?: number;
  saturationStatus?: boolean;
  brightness?: number;
  brightnessStatus?: boolean;
  contrast?: number;
  contrastStatus?: boolean;
  invert?: boolean;
  invertStatus?: boolean;
  cropStatus: boolean;
  crop?: CropProperies;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string | null;
  fontSize: number;
  fontType: string;
  textColor: string;
  boldStatus: boolean;
  italicStatus: boolean;
}

export interface DrawElement extends BaseElement {
  type: "draw";
  strokeStyle: string;
  lineWidth: string;
  startPoint: [number, number];
  drawingPoint: number[];
}

export type Element =
  | ImageElement
  | TextElement
  | DrawElement
  | RectElement
  | CircleElement
  | LineElement;
