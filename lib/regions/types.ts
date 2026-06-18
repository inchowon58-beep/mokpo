export type ContentBlock = {
  title: string;
  text: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type PromiseItem = {
  num: string;
  title: string;
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type RegionPageContent = {
  slug: string;
  imageFolder: string;
  brandName: string;
  brandSubtitle: string;
  heroBadge: string;
  heroTitleLines: string[];
  heroHighlight: string;
  heroSubtitle: string;
  heroIntro: string;
  missionTitleLines: string[];
  missionText: string;
  stats: StatItem[];
  storyTitleLines: string[];
  storyText: string;
  shelterTitleLines: string[];
  shelterText: string;
  processIntro: string;
  contactText: string;
  footerBrand: string;
  footerSubtitle: string;
  footerKeywords: string;
  footerCopyright: string;
  altPrefixes: readonly string[];
  processSteps: ProcessStep[];
  serviceItems: ContentBlock[];
  promises: PromiseItem[];
  faqItems: FaqItem[];
};

export type RegionSeo = {
  path: string;
  targetKeywords: readonly string[];
  siteTitle: string;
  siteDescription: string;
  metadataTemplate: string;
  metadataKeywords: string[];
  ogSiteName: string;
  ogImageAlt: string;
  areaServed: string;
  organizationName: string;
  organizationDescription: string;
  websiteName: string;
};
