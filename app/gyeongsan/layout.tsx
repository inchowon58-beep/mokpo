import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default:
      "경산강아지파양·경산고양이파양·경산강아지보호소·경산고양이보호소·경산유기견·유기묘보호소 전문 안내",
    template: "%s | 경산강아지·고양이파양",
  },
};

export default function GyeongsanLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
