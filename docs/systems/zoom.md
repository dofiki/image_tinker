# zoom

`zoom` state variable is controlled by zoom in [+] and zoom out [-] buttons using the `setZoom` setter. `zoomRef` mirrors the same value but is used inside event handlers where the state value would be stale.

```typescript
const [zoom, setZoom] = useState(1); // for components that need to re-render
const zoomRef = useRef(1); // for event handlers that need fresh value
```

The buttons live in the bottom-right corner of the canvas container:

```tsx
<div className="absolute bottom-5 right-5 flex flex-col gap-2 z-50">
  <button
    className="bg-white/60 p-2 rounded-sm hover:bg-white transition-all ease-in"
    onClick={handleZoomIn}
  >
    <IoMdAdd />
  </button>
  <button
    className="bg-white/60 p-2 rounded-sm hover:bg-white transition-all ease-in"
    onClick={handleZoomOut}
  >
    <GrFormSubtract />
  </button>
</div>
```

---

Both handlers clamp the value, zoom is locked between `0.9` and `1.6`; and update both the ref and the state:

```typescript
function handleZoomIn() {
  const next = Math.min(zoomRef.current + 0.1, 1.6);
  zoomRef.current = next;
  setZoom(next);
}

function handleZoomOut() {
  const next = Math.max(zoomRef.current - 0.1, 0.9);
  zoomRef.current = next;
  setZoom(next);
}
```

---

## Passing `zoom` value to the canvas

`zoom` is passed down to the `Canvas` component as a prop:

```tsx
<Canvas
  {/* ...other props */}
  zoom={zoom}
/>
```

Inside `Canvas`, `zoom` is multiplied with `scale` (the fit-to-container scale) to get `totalScale`:

```typescript
const totalScale = scale * zoom;
```

`totalScale` is then used to set the wrapper div's dimensions and to apply the CSS transform on the canvas element:

```tsx
<div
  style={{
    position: "absolute",
    width: canvasConfig.width * totalScale,
    height: canvasConfig.height * totalScale,
    // ...other properties
  }}
>
  <canvas
    ref={canvasRef}
    width={canvasConfig.width}
    height={canvasConfig.height}
    style={{
      display: "block",
      transformOrigin: "top left",
      transform: `scale(${totalScale})`,
      // ...other properties
    }}
  />
</div>
```
