Dragging is one of the responsibilities of `handleMouseDown`, triggered by the `onMouseDown` event listener on the canvas. Before understanding how dragging works, it's important to understand the difference between **global space** and **local space** because rotation makes the two diverge.

---

## Global Space vs. Local Space

**Global space** is the coordinate system of the canvas itself. Every raw mouse event (`mouseX`, `mouseY`) lives here. The origin is the top-left corner of the canvas and the axes are perfectly horizontal and vertical; no rotation involved.

**Local space** is the coordinate system of a specific element, rotated along with it. When an element is at 0°, its local space and global space are aligned. The moment you rotate it, its local axes tilt but the element's `x`, `y`, `width`, and `height` properties still describe a clean, upright rectangle _in that tilted space_.

This is the core problem: the hit-detection logic (`localX >= el.x && localX <= el.x + el.width ...`) assumes a flat, unrotated bounding box. It has no concept of a tilted shape. So rather than rewriting hit detection to understand rotation, the solution is to bring the mouse _into the element's local space_: un-rotating the mouse position by the same angle the element is rotated so the comparison can proceed as if nothing was ever rotated.

> **To be precise:** the mouse isn't rotated _by_ the element's angle. It's rotated _by the inverse_ (negative) of that angle, effectively undoing the element's rotation from the mouse's perspective. The element's bounding box stays described at 0°; the mouse point is the thing that gets transformed to match.

---

## `toLocalSpace()`

```typescript
export function toLocalSpace(
  px: number,
  py: number,
  cx: number,
  cy: number,
  rotationDeg: number,
): { x: number; y: number } {
  const angle = -(rotationDeg * Math.PI) / 180; // negate → inverse rotation
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const dx = px - cx; // vector from element center to mouse
  const dy = py - cy;

  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}
```

| Step                           | What happens                                                                           |
| ------------------------------ | -------------------------------------------------------------------------------------- |
| Negate the angle               | Converts the element's rotation into its inverse, so we can undo it                    |
| `dx = px - cx`, `dy = py - cy` | Reframes the mouse position as a vector _relative to the element's center_             |
| Apply 2D rotation matrix       | Rotates that vector by the negative angle, landing in the element's local space        |
| Add `cx`, `cy` back            | Translates the result back into canvas coordinates (now axis-aligned with the element) |

The returned `localX` and `localY` represent where the mouse _would be_ if the element had never been rotated. The standard AABB (axis-aligned bounding box) check then works correctly.

---

## Hit Detection in `handleMouseDown`

Elements are iterated from top to bottom (reverse array order, so the topmost-rendered element wins):

```typescript
for (let i = elements.length - 1; i >= 0; i--) {
  const el = elements[i];

  // Find the element's center in global space
  const cx = el.x + el.width / 2;
  const cy = el.y + el.height / 2;

  // Bring the mouse into the element's local (un-rotated) space
  const { x: localX, y: localY } = toLocalSpace(
    mouseX,
    mouseY,
    cx,
    cy,
    el.rotation,
  );

  // Standard bounding box check — works because localX/Y are axis-aligned
  if (
    localX >= el.x &&
    localX <= el.x + el.width &&
    localY >= el.y &&
    localY <= el.y + el.height
  ) {
    isDragging.current = true;
    dragElementId.current = el.id;

    // Offset = distance from element's top-left to where the user clicked.
    // Preserved so the element doesn't snap its corner to the cursor.
    dragOffset.current = { x: mouseX - el.x, y: mouseY - el.y };

    setSelectedElementId(el.id);
    return;
  }
}
```

The drag offset records how far inside the element the user clicked. Without it, releasing and re-pressing would cause the element to jump so its top-left aligns with the cursor.

---

## Moving the Element in `handleMouseMove`

`onMouseMove` fires `handleMouseMove`. It exits early if no drag is active:

```typescript
if (!isDragging.current || !dragElementId.current) return;
const el = elements.find((el) => el.id === dragElementId.current);
if (!el) return;
```

### Draw elements

Free-hand drawing elements store an array of raw points (`drawingPoint`) rather than a simple rectangle, so every point must be shifted by the same delta as the element's origin:

```typescript
if (el.type === "draw") {
  const newX = mouseX - dragOffset.current.x;
  const newY = mouseY - dragOffset.current.y;
  const dx = newX - el.x;
  const dy = newY - el.y;

  const movedPoints = el.drawingPoint.map(
    (val, i) => (i % 2 === 0 ? val + dx : val + dy), // even indices = x coords, odd = y coords
  );

  updateElement(dragElementId.current, {
    x: newX,
    y: newY,
    startPoint: [el.startPoint[0] + dx, el.startPoint[1] + dy],
    drawingPoint: movedPoints,
  });
  return;
}
```

### All other elements

A simple position update using the stored offset:

```typescript
updateElement(dragElementId.current, {
  x: mouseX - dragOffset.current.x,
  y: mouseY - dragOffset.current.y,
});
```

Subtracting the offset means the element moves with the cursor while staying anchored to the original click point, no jump.

---

## Releasing the Drag (`onMouseUp` / `onMouseLeave`)

Both events call the same cleanup function:

```typescript
function handleMouseUp() {
  isDrawing.current = false;
  isDragging.current = false;
  isResizing.current = false;
  dragElementId.current = null;
  rectOrigin.current = { x: 0, y: 0 };
  rectId.current = null;
}
```

All mutable refs are reset so subsequent mouse events start from a clean state. `onMouseLeave` hooks into the same function so a drag is properly cancelled if the cursor exits the canvas boundary mid-drag.

---

## Summary

```
onMouseDown
  └─ handleMouseDown
        ├─ toLocalSpace()  // un-rotate mouse into element's local frame
        ├─ AABB hit check  // works because both mouse and box are now axis-aligned
        └─ store dragOffset, dragElementId, isDragging = true

onMouseMove
  └─ handleMouseMove
        ├─ draw elements   // shift origin + every point by (dx, dy)
        └─ other elements  // new position = mouse − dragOffset

onMouseUp / onMouseLeave
  └─ handleMouseUp // reset all drag refs
```
