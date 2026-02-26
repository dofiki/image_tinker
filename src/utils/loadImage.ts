const imageCache: Record<string, HTMLImageElement> = {};

async function loadImage(src: string): Promise<HTMLImageElement> {
  // Check if we already loaded this URL:
  if (imageCache[src]) return Promise.resolve(imageCache[src]);

  return new Promise((resolve, reject) => {
    // create new image element
    const img = new Image();

    // whem image is loaded
    img.onload = () => {
      // store in cache
      imageCache[src] = img;
      // return the loaded image
      resolve(img);
    };

    // if loading fails
    img.onerror = reject;
    // start loading
    img.src = src;
  });
}

export default loadImage;

export function getImageFromCache(src: string): HTMLImageElement | null {
  return imageCache[src] ?? null;
}
