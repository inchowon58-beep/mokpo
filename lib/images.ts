import fs from "fs";
import path from "path";

export type ShelterImage = {
  src: string;
  alt: string;
};

function sortKey(filename: string): number {
  const match = filename.match(/shelter-(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

const MAX_IMAGES = 10;

export function getShelterImages(
  imageFolder = "",
  altPrefixes: readonly string[] = [],
): ShelterImage[] {
  const dir = imageFolder
    ? path.join(process.cwd(), "public", "images", imageFolder)
    : path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(dir)) {
    return [];
  }

  const basePath = imageFolder ? `/images/${imageFolder}` : "/images";

  return fs
    .readdirSync(dir)
    .filter((file) => /^shelter-\d+\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => sortKey(a) - sortKey(b))
    .slice(0, MAX_IMAGES)
    .map((file, index) => ({
      src: `${basePath}/${file}`,
      alt: altPrefixes.length
        ? `${altPrefixes[index % altPrefixes.length]} — 실제 보호소 사진 ${index + 1}`
        : `보호소 사진 ${index + 1}`,
    }));
}

export function getFirstShelterImagePath(imageFolder = ""): string | null {
  const images = getShelterImages(imageFolder);
  return images[0]?.src ?? null;
}
