import type { Metadata } from "next";
import {
  getStructuredData,
  seoTagline,
  siteDescription,
  siteTitle,
  siteUrl,
  targetKeywords,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | 전주강아지·고양이파양",
  },
  description: siteDescription,
  keywords: [
    ...targetKeywords,
    "전주 강아지 파양",
    "전주 고양이 파양",
    "전주 유기견",
    "전주 유기묘",
    "전주 강아지보호소",
    "전주 고양이보호소",
    "아가펫",
  ],
  authors: [{ name: "아가펫" }],
  creator: "아가펫",
  publisher: "아가펫",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: seoTagline,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/shelter-01.png",
        width: 1200,
        height: 630,
        alt: "전주강아지파양·전주고양이파양·전주강아지보호소·전주고양이보호소·전주유기견·유기묘보호소·강아지보호소·고양이보호소",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/shelter-01.png"],
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "반려동물",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = getStructuredData();

  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="font-sans pb-safe-floating">{children}</body>
    </html>
  );
}
