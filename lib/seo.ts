export const siteUrl = "https://jenju.vercel.app";

export const targetKeywords = [
  "전주강아지파양",
  "전주고양이파양",
  "전주강아지보호소",
  "전주고양이보호소",
  "전주유기견보호소",
  "전주유기묘보호소",
  "전주유기견유기묘보호소",
  "전주유기견센터",
  "전주유기견보호센터",
  "강아지보호소",
  "고양이보호소",
  "강아지파양",
  "고양이파양",
  "유기묘보호소",
  "강아지무료분양",
  "고양이무료분양",
  "유기동물보호소",
] as const;

export const siteTitle =
  "전주강아지파양·전주고양이파양 | 전주강아지보호소·전주고양이보호소·전주유기견·유기묘보호소·강아지보호소·고양이보호소 전문안내";

export const siteDescription =
  "전주강아지파양·전주고양이파양·전주강아지보호소·전주고양이보호소·전주유기견보호소·전주유기묘보호소·전주유기견유기묘보호소 전문 상담센터입니다. 강아지보호소·고양이보호소·강아지파양·고양이파양·강아지무료분양·고양이무료분양·유기동물보호소 입양 안내. 전화 0505-707-0401";

export const seoTagline =
  "전주강아지파양 · 전주고양이파양 · 전주유기견·유기묘보호소 · 전주강아지보호소 · 전주고양이보호소 · 강아지보호소 · 고양이보호소 전문 안내";

export function getStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "전주강아지파양·전주고양이파양·전주유기견·유기묘보호소 전문안내",
        description: siteDescription,
        inLanguage: "ko-KR",
      },
      {
        "@type": "AnimalShelter",
        "@id": `${siteUrl}/#organization`,
        name: "전주강아지파양 · 전주고양이파양 · 전주강아지보호소 · 전주고양이보호소",
        url: siteUrl,
        description:
          "전주강아지보호소·전주고양이보호소·전주유기견보호소·전주유기묘보호소·강아지보호소·고양이보호소 전문 상담. 강아지무료분양·고양이무료분양·유기동물보호소 안내.",
        telephone: "0505-707-0401",
        areaServed: {
          "@type": "City",
          name: "전라북도 전주시",
        },
        knowsAbout: [...targetKeywords],
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "전주강아지파양·전주강아지보호소는 어떻게 이용하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "전주강아지파양·전주강아지보호소·전주유기견보호소 상담을 통해 반려견 파양 절차를 안내합니다. 강아지보호소·강아지파양 관련 문의도 전화로 가능합니다.",
            },
          },
          {
            "@type": "Question",
            name: "전주고양이파양·전주고양이보호소·고양이보호소 이용은 어떻게 하나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "전주고양이파양·전주고양이보호소·전주유기묘보호소·고양이보호소 상담을 통해 반려묘 파양 절차를 안내합니다. 고양이파양·고양이무료분양 입양 연계도 지원합니다.",
            },
          },
          {
            "@type": "Question",
            name: "전주유기견·유기묘보호소 전문 안내는 무엇인가요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "전주유기견보호소·전주유기묘보호소·전주유기견유기묘보호소 연계를 통해 반려견·반려묘 보호·파양·입양 전 과정을 안내하는 전문 상담 서비스입니다.",
            },
          },
          {
            "@type": "Question",
            name: "강아지무료분양·고양이무료분양은 어떻게 진행되나요?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "유기동물보호소에서 보호 중인 반려견·반려묘를 책임 있는 가정에 강아지무료분양·고양이무료분양 형태로 연결합니다. 입양 전 상담과 사후 관리를 제공합니다.",
            },
          },
        ],
      },
    ],
  };
}
