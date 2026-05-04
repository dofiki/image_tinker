import type { Element } from "./elements";

export interface Commands {
  execute: (elements: Element[]) => Element[];
  reverse: (elements: Element[]) => Element[];
}
