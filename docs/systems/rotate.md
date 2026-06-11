## Context Save / Restore

Before entering the rendering pipeline, the canvas context state is saved. This is essential because rendering individual elements involves translating the canvas origin and those translations must not bleed into subsequent renders.

```typescript
ctx.save();
dispatchRender(element, ctx);
ctx.restore();
```

`ctx.save()` pushes the current transform matrix (and other state) onto a stack. After the element is fully rendered, `ctx.restore()` pops it back, returning the origin to `(0, 0)` and discarding any transforms applied during that render phase. Each element therefore gets a clean slate.

---

## Rotation Property

Each element exposes a `rotation` field (in degrees) on its base interface:

```typescript
export interface BaseElement {
  name: string | null;
  id: string;
  x: number;
  y: number;
  // ...other properties
  rotation: number;
  // ...other properties
}
```

The value is controlled via a range slider in the UI. The slider accepts `0–360` degrees and writes the numeric value directly back to the element's properties:

```tsx
<input
  type="range"
  min={0}
  max={360}
  value={element.rotation}
  className="slider"
  onChange={(e) => update({ rotation: +e.target.value })}
/>
```

---

## Translating the Origin to the Element's Center

Canvas rotation always happens relative to the current origin `(0, 0)`. To rotate an element around its own center rather than the top-left corner of the canvas, the origin must first be moved to that center:

```typescript
ctx.translate(element.x + element.width / 2, element.y + element.height / 2);
```

After this call, the origin sits exactly at the element's center in world space. Any subsequent rotation will pivot around that point.

---

## Converting Degrees to Radians

`ctx.rotate()` expects an angle in **radians**, not degrees. The conversion is derived from the definition of a radian:

> An arc of a circle with the same length as the radius subtends an angle of **1 radian**.  
> A full circumference subtends **2π radians**, which equals **360°**.

Therefore:

```
360° = 2π rad
1°   = π / 180 rad
n°   = n × (π / 180) rad
```

Applied in code:

```typescript
ctx.rotate((element.rotation * Math.PI) / 180);
```

---

## 5. Drawing the Image with a Center Offset

After the translation and rotation, the origin is sitting at the element's center. If `drawImage` were called with the element's original `x` and `y`, the image would be placed with its **top-left corner** at the center visually off by half its size in both axes.

To fix this, the draw coordinates are offset by half the element's dimensions in the **negative** direction, which shifts the image so its center aligns with the (now-rotated) origin:

```
draw x = -element.width  / 2
draw y = -element.height / 2
```

This is applied in both the cropped and uncropped rendering paths:

```typescript
if (
  element.cropStatus &&
  cX !== undefined &&
  cY !== undefined &&
  cW !== undefined &&
  cH !== undefined
) {
  // cropped:
  ctx.drawImage(
    imageObject,
    cX,
    cY,
    cW,
    cH, // source crop region
    -element.width / 2, // destination x (offset to center)
    -element.height / 2, // destination y (offset to center)
    element.width,
    element.height,
  );
} else {
  // uncropped:
  ctx.drawImage(
    imageObject,
    -element.width / 2, // destination x (offset to center)
    -element.height / 2, // destination y (offset to center)
    element.width,
    element.height,
  );
}
```
