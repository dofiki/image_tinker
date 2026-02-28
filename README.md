# Image Tinker

> A lightweight, browser-based image editor built on HTML Canvas.

## Why I Built This

I built Image Tinker to understand how image editors like GIMP and
Photoshop work internally.

## Tech Stack

- **React + TypeScript** — component structure and type safety across
  canvas interactions which get complex fast
- **HTML Canvas** — chosen over DOM-based approach because manipulating
  pixels and handling overlapping elements is significantly cleaner in
  canvas than managing z-index and absolute positioning
- **Zustand** — global state for elements and canvas config without the
  boilerplate Redux requires. The store felt close to a plain JS object
  which made it easy to reason about
- **Tailwind** — utility classes for the minimal UI chrome around the canvas

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

1. Clone the repo

```bash
   git clone https://github.com/yourname/image-tinker.git
```

2. Install dependencies

```bash
   cd image-tinker
   npm install
```

3. Start the dev server

```bash
   npm run dev
```

4. Open `http://localhost:5173`

## How It Works

1. Click the **canvas icon** in the toolbar to create a canvas and set
   its dimensions and background color
2. Click the **image icon** to upload an image — it auto-scales to fit
   your canvas
3. Use the **move tool** to drag, resize, or delete (Delete key) elements
4. Use the **text tool** to click anywhere on the canvas and type

## Project Structure

```
src/
├── components/       # Canvas, Toolbar, CreateCanvas
├── hooks/            # Logic separated by concern
│   ├── useCanvasRender.ts    # drawing loop
│   ├── useCanvasDrag.ts      # drag + resize interactions
│   ├── useTextOverlay.ts     # text placement and commit
│   └── useDeleteOnKeypress.ts
├── store/            # Zustand store — single source of truth
├── utils/            # Pure helper functions
├── types/            # Shared TypeScript types
└── constants/        # Canvas size limits, min element size
```

## Current State

**Done**

- Create canvas feature
- Image upload and auto-scaling
- Move tool
- Text tool
- Delete
- Save

**Working**

- Refactor
- Text resizing after placement

**To Do**

- \*Undo/Redo
- Selection to front
- Layers
- Panel to edit selected element's properties.
