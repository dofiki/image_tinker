export interface BaseElement {
  name: string | null;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  visibilityStatus: boolean;
  blur: number | undefined;
  saturate: number | undefined;
  saturationStatus: boolean | undefined;
  brightness: number | undefined;
  brightnessStatus: boolean | undefined;
  contrast: number | undefined;
  contrastStatus: boolean | undefined;
  invert: boolean | undefined;
  invertStatus: boolean | undefined;
  opacity: number | undefined;
  blendMode: GlobalCompositeOperation;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
  content: null;
  fontSize: undefined;
  textColor: undefined;
  fontType: undefined;
}

export interface TextElement extends BaseElement {
  type: "text";
  src: null;
  content: string | null;
  fontSize: number;
  fontType: string;

  textColor: string;
  boldStatus: boolean;
  italicStatus: boolean;
}

export interface DrawElement extends BaseElement {
  type: "draw";
  src: null;
  content: null;
  fontSize: undefined;
  textColor: "#000000";
  fontType: string;
  strokeStyle: string;
  lineWidth: string;
  startPoint: [number, number];
  drawingPoint: number[];
  boldStatus: boolean;
  italicStatus: boolean;
}

export type Element = ImageElement | TextElement | DrawElement;

export type ElementUpdate = {
  name?: string | null;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  rotation?: number;
  content?: string | null;
  fontSize?: number;
  fontType?: string;
  textColor?: string;
  visibilityStatus?: boolean;
  blur?: number | undefined;
  saturate?: number | undefined;
  saturationStatus?: boolean | undefined;
  brightness?: number | undefined;
  brightnessStatus?: boolean | undefined;
  contrast?: number | undefined;
  contrastStatus?: boolean | undefined;
  invert?: boolean | undefined;
  invertStatus?: boolean | undefined;
  opacity?: number | undefined;
  blendMode?: GlobalCompositeOperation;
  boldStatus?: boolean | undefined;
  italicStatus?: boolean | undefined;
  strokeStyle?: string;
  lineWidth?: string;
  startPoint?: [number, number];
  drawingPoint?: number[];
};
