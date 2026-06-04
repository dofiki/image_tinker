
export const PRESETS = [
  { label: "Instagram Post", width: 1080, height: 1080 },
  { label: "Instagram Story", width: 1080, height: 1920 },
  { label: "YouTube Thumb", width: 1280, height: 720 },
  { label: "A4 Portrait", width: 794, height: 1123 },
  { label: "A4 Landscape", width: 1123, height: 794 },
  { label: "LinkedIn Post", width: 1200, height: 627 },
];

export function PresetIcon({ width, height }: { width: number; height: number }) {
  const maxSize = 38;
  const ratio = width / height;
  let w = maxSize;
  let h = maxSize;
  if (ratio > 1) h = Math.round(maxSize / ratio);
  else if (ratio < 1) w = Math.round(maxSize * ratio);
  return (
    <div
      className="border border-current rounded-xs flex"
      style={{ width: w, height: h }}
    />
  );
}