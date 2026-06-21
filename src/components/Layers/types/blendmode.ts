export interface BlendModeSelectProps {
  value: GlobalCompositeOperation | undefined;
  onChange: (value: GlobalCompositeOperation) => void;
  disabled: boolean;
}
