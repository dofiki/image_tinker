# Pan

To implement panning in Image Tinker, mouse event listeners are added to the canvas container. The canvas position is set to `absolute` relative to the container, and its `top` and `left` values are updated as the mouse moves. A clamp prevents the canvas from drifting too far outside the container.

Three variables drive the feature:

```typescript
const isPanning = useRef(false); // tracks whether the mouse is held down and moving
const initialPanPosition = useRef({ x: 0, y: 0 }); // mouse position at the start of each drag step
const [tempPos, setTempPos] = useState({ top: 0, left: 0 }); // current canvas position, passed as top/left to the canvas wrapper
```

## `handleMouseDown`

Records the starting mouse position when the user presses down, but only if `panStatus` is active and the container exists.

```typescript
function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (!canvasContainer.current || !panStatus) return;
  const rect = canvasContainer.current.getBoundingClientRect();
  isPanning.current = true;

  initialPanPosition.current = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}
```

---

## `handleMouseMove`

First the guard clause bails out early if any of the required pieces are missing: the container ref, the panning flag, the canvas config, or the canvas ref.

Mouse position is measured relative to the container (not the page) by subtracting `rect.left` and `rect.top` from the raw client coordinates. `dx` and `dy` are then the difference between where the mouse is now and where it was at the start of this drag step — not since the very beginning of the drag, just since the last `mousemove` event. This gives smooth incremental movement rather than a single jump.

```
mouseX = e.clientX - rect.left   // mouse position inside the container
dx = mouseX - initialPanPosition.current.x  // how far it moved since last event
```

Next the actual rendered size of the canvas is calculated. The canvas has logical pixel dimensions (`canvas.width`, `canvas.height`) but is scaled down to fit the container via `scale`, then further adjusted by `zoomRef.current`. Multiplying all three gives the true pixel footprint of the canvas on screen.

The clamping bounds are derived from that rendered size. `MARGIN` (100px) is the minimum number of pixels of the canvas that must remain visible at all times.

```
MIN_POSITION_Y = -(scaledH - MARGIN)  // top edge: canvas can slide up until only MARGIN px remain visible at the bottom
MAX_POSITION_Y = rect.height - MARGIN // bottom edge: canvas can slide down until only MARGIN px remain visible at the top
MIN_POSITION_X = -(scaledW - MARGIN)  // left edge: same logic horizontally
MAX_POSITION_X = rect.width - MARGIN  // right edge
```

`setTempPos` uses a functional update so `prev` is always the latest position, not a stale closure value. The new position is `prev + delta`, then clamped between min and max.

Finally `initialPanPosition` is updated to the current mouse position so the next `mousemove` event measures delta from here, not from the original mousedown.

```typescript
function handleMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  if (
    !canvasContainer.current ||
    !isPanning.current ||
    !canvasConfig ||
    !canvasRef.current
  )
    return;

  const rect = canvasContainer.current.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // actual distance the mouse moved since the last event
  const dx = mouseX - initialPanPosition.current.x;
  const dy = mouseY - initialPanPosition.current.y;

  const canvas = canvasRef.current;

  // scale factor that fits the canvas inside the container
  const scale = Math.min(
    1,
    rect.height / canvas.height,
    rect.width / canvas.width,
  );

  // actual rendered dimensions of the canvas
  const scaledW = canvas.width * scale * zoomRef.current;
  const scaledH = canvas.height * scale * zoomRef.current;

  const MARGIN = 100; // minimum pixels of canvas that must remain visible

  const MIN_POSITION_Y = -(scaledH - MARGIN); // how far up the canvas can slide
  const MAX_POSITION_Y = rect.height - MARGIN; // how far down the canvas can slide
  const MIN_POSITION_X = -(scaledW - MARGIN); // how far left the canvas can slide
  const MAX_POSITION_X = rect.width - MARGIN; // how far right the canvas can slide

  setTempPos((prev) => {
    const newTop = prev.top + dy;
    const clampedTop = Math.min(newTop, MAX_POSITION_Y); // downward clamp
    const finalTop = Math.max(MIN_POSITION_Y, clampedTop); // upward clamp

    const newLeft = prev.left + dx;
    const clampedLeft = Math.min(newLeft, MAX_POSITION_X); // rightward clamp
    const finalLeft = Math.max(MIN_POSITION_X, clampedLeft); // leftward clamp

    return {
      top: finalTop,
      left: finalLeft,
    };
  });

  // update the reference point so the next event measures delta from here
  initialPanPosition.current = { x: mouseX, y: mouseY };
}
```

---

## `handleMouseUp`

Stops panning when the mouse is released.

```typescript
function handleMouseUp() {
  isPanning.current = false;
}
```

---

## Centering the canvas on load

When a canvas is first created, `tempPos` starts at `{ top: 0, left: 0 }` which places the canvas at the top-left corner of the container. This effect runs after `canvasConfig` is set (which is when the `Canvas` component actually mounts and `canvasRef.current` becomes available) and repositions the canvas to the center.

The same fit-to-container `scale` is calculated, then the leftover space after scaling is split evenly on both sides:

```
leftover width  = containerWidth  - (canvas.width  * scale)
leftover height = containerHeight - (canvas.height * scale)

left = leftover width  / 2   → equal margin on left and right
top  = leftover height / 2   → equal margin on top and bottom
```

The `+ 20` on `top` is a small nudge to account for the toolbar above the container.

```typescript
useEffect(() => {
  const container = canvasContainer.current;
  const canvas = canvasRef.current;
  if (!container || !canvas || !canvas.width || !canvas.height) return;

  const rect = container.getBoundingClientRect();
  const scale = Math.min(
    1,
    rect.height / canvas.height,
    rect.width / canvas.width,
  );
  setTempPos({
    top: (rect.height - canvas.height * scale) / 2 + 20,
    left: (rect.width - canvas.width * scale) / 2,
  });
}, [canvasConfig]);
```

The dependency is `canvasConfig` rather than the refs because refs are not reactive. When `canvasConfig` changes, React re-renders and mounts the `Canvas` component, at which point the refs are populated and the centering math can run correctly.

---

## Passing position to the canvas

`tempPos` is passed to the `Canvas` component as a prop:

```tsx
<Canvas
  {/* ...other props */}
  tempPos={tempPos}
  zoom={zoom}
/>
```

Inside `Canvas`, it is applied to the wrapper div that holds the canvas element:

```tsx
<div
  style={{
    position: "absolute",
    {/* ...other properties */}
    top: tempPos.top,
    left: tempPos.left,
  }}
>
  <canvas />
</div>
```
