import type { BlendModeSelectProps } from "../types/index";
import { BLEND_MODES } from "../constants";
export const BlendMode = ({
  value,
  onChange,
  disabled,
}: BlendModeSelectProps) => (
  <select
    value={value ?? "source-over"}
    onChange={(e) => onChange(e.target.value as GlobalCompositeOperation)}
    className={`select-none ${disabled ? "select dont-point" : "select"}`}
  >
    {BLEND_MODES.map((m) => (
      <option key={m.value} value={m.value}>
        {m.label}
      </option>
    ))}
  </select>
);
