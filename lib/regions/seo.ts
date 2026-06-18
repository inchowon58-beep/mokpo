import { siteUrl } from "@/lib/seo";
import type { RegionSeo } from "./types";

export const mokpoSeo: RegionSeo = {
  path: "",
  targetKeywords: [
    "목포강아지파양",
    "목포강아지보호소",
    "목포유기견보호소",
    "목포유기견센터",
    "목포유기견보호센터",
    "목포고양이파양",
    "목포고양이보호소",
    "목포유기묘보호소",
    "강아지무료분양",
    "고양이무료분양",
    "고양이파양",
    "고양이보호소",
    "유기묘보호소",
    "유기동물보호소",
  ],
  siteTitle:
    "목포강아지파양·목포고양이파양·목포강아지보호소·목포고양이보호소·목포유기견·유기묘보호소 전문 안내",
  siteDescription:
    "목포강아지파양·목포고양이파양·목포강아지보호소·목포고양이보호소·목포유기견보호소·목포유기묘보호소 전문 상담센터입니다. 강아지무료분양·고양이무료분양·유기동물보호소 입양 안내. 전화 0505-707-0401",
  metadataTemplate: "%s | 목포강아지·고양이파양",
  metadataKeywords: [
    "목포 강아지 파양",
    "목포 고양이 파양",
    "목포 유기견",
    "목포 유기묘",
    "아가펫",
  ],
  ogSiteName: "목포강아지파양 · 목포고양이파양 · 목포유기견·유기묘보호소 안내",
  ogImageAlt: "목포강아지파양·목포고양이파양·목포유기견·유기묘보호소 전경",
  areaServed: "전라남도 목포시",
  organizationName: "목포강아지파양 · 목포고양이파양 · 목포유기견·유기묘보호센터",
  organizationDescription:
    "목포강아지보호소·목포고양이보호소·목포유기견보호소·목포유기묘보호소 전문 상담. 강아지무료분양·고양이무료분양·유기동물보호소 안내.",
  websiteName: "목포강아지파양·목포고양이파양 안내",
};

export const gyeongsanSeo: RegionSeo = {
  path: "gyeongsan",
  targetKeywords: [
    "경산강아지파양",
    "경산강아지보호소",
    "경산유기견보호소",
    "경산유기견센터",
    "경산유기견보호센터",
    "경산고양이파양",
    "경산고양이보호소",
    "경산유기묘보호소",
    "강아지무료분양",
    "고양이무료분양",
    "고양이파양",
    "고양이보호소",
    "유기묘보호소",
    "유기동물보호소",
  ],
  siteTitle:
    "경산강아지파양·경산고양이파양·경산강아지보호소·경산고양이보호소·경산유기견·유기묘보호소 전문 안내",
  siteDescription:
    "경산강아지파양·경산고양이파양·경산강아지보호소·경산고양이보호소·경산유기견보호소·경산유기묘보호소 전문 상담센터입니다. 강아지무료분양·고양이무료분양·유기동물보호소 입양 안내. 전화 0505-707-0401",
  metadataTemplate: "%s | 경산강아지·고양이파양",
  metadataKeywords: [
    "경산 강아지 파양",
    "경산 고양이 파양",
    "경산 유기견",
    "경산 유기묘",
    "아가펫",
  ],
  ogSiteName: "경산강아지파양 · 경산고양이파양 · 경산유기견·유기묘보호소 안내",
  ogImageAlt: "경산강아지파양·경산고양이파양·경산유기견·유기묘보호소 전경",
  areaServed: "경상북도 경산시",
  organizationName: "경산강아지파양 · 경산고양이파양 · 경산유기견·유기묘보호센터",
  organizationDescription:
    "경산강아지보호소·경산고양이보호소·경산유기견보호소·경산유기묘보호소 전문 상담. 강아지무료분양·고양이무료분양·유기동물보호소 안내.",
  websiteName: "경산강아지파양·경산고양이파양 안내",
};

export function getRegionPageUrl(seo: RegionSeo): string {
  return seo.path ? `${siteUrl}/${seo.path}` : siteUrl;
}

export function getStructuredDataForRegion(seo: RegionSeo, faqItems: { question: string; answer: string }[]) {
  const pageUrl = getRegionPageUrl(seo);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${pageUrl}/#website`,
        url: pageUrl,
        name: seo.websiteName,
        description: seo.siteDescription,
        inLanguage: "ko-KR",
      },
      {
        "@type": "AnimalShelter",
        "@id": `${pageUrl}/#organization`,
        name: seo.organizationName,
        url: pageUrl,
        description: seo.organizationDescription,
        telephone: "0505-707-0401",
        areaServed: {
          "@type": "City",
          name: seo.areaServed,
        },
        knowsAbout: [...seo.targetKeywords],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        mainEntity: faqItems.slice(0, 3).map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
