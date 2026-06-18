import type { Metadata } from "next";
import LandingPage from "@/components/LandingPage";
import { getFirstShelterImagePath } from "@/lib/images";
import { gyeongsanContent } from "@/lib/regions/gyeongsan";
import {
  getRegionPageUrl,
  getStructuredDataForRegion,
  gyeongsanSeo,
} from "@/lib/regions/seo";

const ogImagePath =
  getFirstShelterImagePath(gyeongsanContent.imageFolder) ?? "/images/gyeongsan/shelter-01.png";

export const metadata: Metadata = {
  title: gyeongsanSeo.siteTitle,
  description: gyeongsanSeo.siteDescription,
  keywords: [...gyeongsanSeo.targetKeywords, ...gyeongsanSeo.metadataKeywords],
  alternates: {
    canonical: getRegionPageUrl(gyeongsanSeo),
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: getRegionPageUrl(gyeongsanSeo),
    siteName: gyeongsanSeo.ogSiteName,
    title: gyeongsanSeo.siteTitle,
    description: gyeongsanSeo.siteDescription,
    images: [
      {
        url: ogImagePath,
        width: 1200,
        height: 630,
        alt: gyeongsanSeo.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: gyeongsanSeo.siteTitle,
    description: gyeongsanSeo.siteDescription,
    images: [ogImagePath],
  },
};

export default function GyeongsanPage() {
  const structuredData = getStructuredDataForRegion(
    gyeongsanSeo,
    gyeongsanContent.faqItems,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <LandingPage content={gyeongsanContent} />
    </>
  );
}
