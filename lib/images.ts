import fs from "fs";
import path from "path";

const ALT_PREFIXES = [
  "전주강아지파양·전주강아지보호소·강아지보호소 전경",
  "전주고양이파양·전주고양이보호소·고양이보호소 케어",
  "전주유기견보호소·전주유기견유기묘보호소 위탁견",
  "전주유기묘보호소·고양이보호소 입양 대기묘",
  "강아지보호소·강아지무료분양 대기 반려견",
  "고양이보호소·고양이무료분양 대기 반려묘",
] as const;

export type ShelterImage = {
  src: string;
  alt: string;
};

function sortKey(filename: string): number {
  const match = filename.match(/shelter-(\d+)/i);
  return match ? parseInt(match[1], 10) : 0;
}

const MAX_IMAGES = 10;

export function getShelterImages(): ShelterImage[] {
  const dir = path.join(process.cwd(), "public", "images");

  return fs
    .readdirSync(dir)
    .filter((file) => /^shelter-\d+\.(jpg|jpeg|png|webp)$/i.test(file))
    .sort((a, b) => sortKey(a) - sortKey(b))
    .slice(0, MAX_IMAGES)
    .map((file, index) => ({
      src: `/images/${file}`,
      alt: `${ALT_PREFIXES[index % ALT_PREFIXES.length]} — 실제 보호소 사진 ${index + 1}`,
    }));
}
