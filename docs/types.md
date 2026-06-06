## 1. Element

`Element` is a discriminated union that represents every supported element type on the canvas. Each variant is identified by its `type` field.

```ts
export type Element =
  | ImageElement
  | TextElement
  | DrawElement
  | RectElement;
```

All element types (`ImageElement`, `TextElement`, `DrawElement`, and `RectElement`) share a common set of properties defined in the `BaseElement` interface. Specialized element interfaces extend `BaseElement` with their own properties.

#### BaseElement

```ts
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
```

#### RectElement

Represents a rectangle shape.

```ts
export interface RectElement extends BaseElement {
  type: "rect";
  fillStyle: string;
  strokeStyle: string;
}
```

#### ImageElement

Represents an image element. Supports image effects such as blur, saturation, brightness, contrast, inversion, and cropping.

```ts
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
```

#### CropProperties

Defines the crop region for an image.

```ts
export interface CropProperies {
  sx?: number;
  sy?: number;
  width?: number;
  height?: number;
}
```

#### TextElement

Represents a text element.

```ts
export interface TextElement extends BaseElement {
  type: "text";
  content: string | null;
  fontSize: number;
  fontType: string;
  textColor: string;
  boldStatus: boolean;
  italicStatus: boolean;
}
```

#### DrawElement

Represents a freehand drawing.

```ts
export interface DrawElement extends BaseElement {
  type: "draw";
  strokeStyle: string;
  lineWidth: string;
  startPoint: [number, number];
  drawingPoint: number[];
}
```

## 2. CanvasConfig

Defines the canvas dimensions and background color.

```ts
interface CanvasConfig {
  width: number;
  height: number;
  background: string;
}
```

## 3. Commands

Commands are used to implement undo and redo functionality. Each command defines how to apply and reverse a change.

```ts
interface Commands {
  execute: (elements: Element[]) => Element[];
  reverse: (elements: Element[]) => Element[];
}
```

## 4. EditorStore

The complete shape of the Zustand store. See `store.md` for details about each action.

```ts
export interface EditorStore {
  // Undo/redo history
  past: Commands[];
  future: Commands[];

  // Canvas configuration
  canvasConfig: CanvasConfig | null;
  setCanvasConfig: (
    config: Partial<CanvasConfig> | CanvasConfig,
  ) => void;

  // Elements
  elements: Element[];
  setElements: (element: Element[]) => void;

  // Element operations
  addElement: (element: Element) => void;
  updateElement: (
    id: string | undefined,
    update: Partial<Element>,
  ) => void;
  removeElement: (id: string) => void;

  // Undo/redo actions
  undo: () => void;
  redo: () => void;

  // Copy and paste operations
  handleCopy: (
    selectedElementId: string,
    elements: Element[],
    copiedElementRef: React.MutableRefObject<Element | null>,
  ) => void;

  handlePaste: (
    copiedElementRef: React.MutableRefObject<Element | null>,
  ) => void;

  // Selection
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;

  // View settings
  rulerStatus: boolean;
  setRulerStatus: (rulerStatus: boolean) => void;

  gridStatus: boolean;
  setGridStatus: (gridStatus: boolean) => void;
}
```