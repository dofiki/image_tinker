export interface BaseElement {
  name: string | null;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
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
}

export type Element = ImageElement | TextElement;

export type ElementUpdate = {
  name?: string | null;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
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
};
