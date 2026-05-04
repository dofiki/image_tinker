export interface BaseElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
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
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  content?: string | null;
  fontSize?: number;
  fontType?: string;
  textColor?: string;
};
