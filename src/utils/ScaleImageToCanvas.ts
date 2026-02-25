interface imageProps {
  imgWidth: number;
  imgHeight: number;
  canvasWidth: number;
  canvasHeight: number;
}

export default function ScaleImageToCanvas({
  imgWidth,
  imgHeight,
  canvasWidth,
  canvasHeight,
}: imageProps) {
  const hRatio = canvasWidth / imgWidth;
  const vRatio = canvasHeight / imgHeight;
  const ratio = Math.min(hRatio, vRatio);
  // new image width and height
  const width = imgWidth * ratio;
  const height = imgHeight * ratio;

  // centerd image position
  const x = (canvasWidth - imgWidth * ratio) / 2;
  const y = (canvasHeight - imgHeight * ratio) / 2;

  return { width, height, x, y };
}
