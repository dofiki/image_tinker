# Resize

This is done in two parts: `handleMouseDown` and `handleMouseMove`. We register `isResizing.current = true` when there is a mouse down inside the handle and we start resizing the element when the mouse moves.

---

## handleMouseDown

### To the Local

We only proceed if there is a selected element, no selection, no resize business.

The tricky part is that the element may already be rotated, which means its handles are rotated too. But AABB hit testing does not care about rotation, it only works on axis-aligned boxes. So instead of rotating the hit test to match the element, we do the opposite: we un-rotate the mouse position by however much the element is rotated.

Now the mouse is in the element's local space, where everything is perfectly axis-aligned and AABB just works. The element still looks rotated on screen, the user has no idea any of this is happening, but under the hood we are just checking a boring rectangle.

```typescript
const cx = selectedElement.x + selectedElement.width / 2;
const cy = selectedElement.y + selectedElement.height / 2;

const { x: localX, y: localY } = rotate(
  mouseX,
  mouseY,
  cx,
  cy,
  -selectedElement.rotation,
);
```

This is what is going on inside the `rotate` utility function: if you are familiar with vector rotation you already know this. We convert degrees to radians, calculate the position of our mouse click relative to the center of the element so we can rotate relative to the element origin, and at last we add the subtraction back to give the mouse position relative to the box origin.

```typescript
export function rotate(
  px: number,
  py: number,
  cx: number,
  cy: number,
  rotationDeg: number,
) {
  const rad = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const dx = px - cx;
  const dy = py - cy;

  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}
```

### Who is the Handle?

We do the AABB hit test to find which handle the user is clicking and we store that to `hitHandle`.

```typescript
const handles = getHandleRect(selectedElement);
const hitHandle = handles.find(
  (h) =>
    localX >= h.x &&
    localX <= h.x + h.width &&
    localY >= h.y &&
    localY <= h.y + h.height,
);
```

### Find the Opposite Corner

We check if the user hit any handle or not. If they did we move to the resizing phase and set `isResizing` to true. We also save which handle the user clicked, something like `"top-left"`, `"bottom-left"`, etc.

The major thing to understand here is we have to store the resizing status, which handle the user clicked, and the opposite local corner of that handle. `resizeLocalAnchor` is the most important one, we are finding the opposite corner point that we will later keep fixed while resizing.

We do this directly in local space using `cx`, `cy` (center of the element) and `hw`, `hh` (half of the element width and height).

```typescript
if (hitHandle) {
  isResizing.current = true;
  resizeHandle.current = hitHandle.position;

  const hw = selectedElement.width / 2;
  const hh = selectedElement.height / 2;

  const oppositeMap: Record<string, { x: number; y: number }> = {
    "top-left": { x: cx + hw, y: cy + hh },
    "top-right": { x: cx - hw, y: cy + hh },
    "bottom-left": { x: cx + hw, y: cy - hh },
    "bottom-right": { x: cx - hw, y: cy - hh },
  };

  resizeLocalAnchor.current = oppositeMap[resizeHandle.current];
  return;
}
```

---

## handleMouseMove

```typescript
// if some element is selected
if (selectedElement) {
  // and resizing status is true
  if (isResizing.current) {
    // ....
```

We derive the pivot directly from the element on every move -- no need to store it separately.

```typescript
const cx = selectedElement.x + selectedElement.width / 2;
const cy = selectedElement.y + selectedElement.height / 2;

// our mouse in local space
const localMouse = rotate(mouseX, mouseY, cx, cy, -selectedElement.rotation);

// the diagonally opposite corner to the one the user grabbed
const localAnchor = resizeLocalAnchor.current;

// un-rotated element properties
let localX = selectedElement.x;
let localY = selectedElement.y;
let newWidth = selectedElement.width;
let newHeight = selectedElement.height;
```

We resize accordingly based on which handle is being dragged:

```typescript
switch (resizeHandle.current) {
  case "top-left":
    localX = localMouse.x;
    localY = localMouse.y;
    newWidth = localAnchor.x - localMouse.x;
    newHeight = localAnchor.y - localMouse.y;
    break;

  case "top-right":
    localX = localAnchor.x;
    localY = localMouse.y;
    newWidth = localMouse.x - localAnchor.x;
    newHeight = localAnchor.y - localMouse.y;
    break;

  case "bottom-left":
    localX = localMouse.x;
    localY = localAnchor.y;
    newWidth = localAnchor.x - localMouse.x;
    newHeight = localMouse.y - localAnchor.y;
    break;

  case "bottom-right":
    localX = localAnchor.x;
    localY = localAnchor.y;
    newWidth = localMouse.x - localAnchor.x;
    newHeight = localMouse.y - localAnchor.y;
    break;
}
```

Then we clamp to a minimum size so the element never collapses to nothing:

```typescript
if (newWidth < MIN_SIZE) {
  newWidth = MIN_SIZE;
  if (
    resizeHandle.current === "top-left" ||
    resizeHandle.current === "bottom-left"
  ) {
    localX = localAnchor.x - MIN_SIZE;
  }
}

if (newHeight < MIN_SIZE) {
  newHeight = MIN_SIZE;
  if (
    resizeHandle.current === "top-left" ||
    resizeHandle.current === "top-right"
  ) {
    localY = localAnchor.y - MIN_SIZE;
  }
}
```

We need to convert those local coordinates back to world space, that means rotating the new local center around the pivot:

```typescript
const newLocalCx = localX + newWidth / 2;
const newLocalCy = localY + newHeight / 2;
const newWorldCenter = rotate(
  newLocalCx,
  newLocalCy,
  cx,
  cy,
  selectedElement.rotation,
);
```

Then update:

```typescript
updateElement(selectedElement.id, {
  x: newWorldCenter.x - newWidth / 2,
  y: newWorldCenter.y - newHeight / 2,
  width: newWidth,
  height: newHeight,
  fontSize: Number(nextFontSize.toFixed()),
});
```
