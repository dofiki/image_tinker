export interface ToolBarProps {
  moveStatus: boolean;
  onMoveStatus: React.Dispatch<React.SetStateAction<boolean>>;
  textStatus: boolean;
  onTextStatus: React.Dispatch<React.SetStateAction<boolean>>;
  colorPickerStatus: boolean;
  onPickerStatus: React.Dispatch<React.SetStateAction<boolean>>;
  colorPlaceholderStatus: boolean;
  onColorPlaceholderStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
