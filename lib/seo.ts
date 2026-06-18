import { mokpoContent } from "@/lib/regions/mokpo";
import {
  getRegionPageUrl,
  getStructuredDataForRegion,
  gyeongsanSeo,
  mokpoSeo,
} from "@/lib/regions/seo";

export const siteUrl = "https://mokpo.vercel.app";

export const targetKeywords = mokpoSeo.targetKeywords;
export const siteTitle = mokpoSeo.siteTitle;
export const siteDescription = mokpoSeo.siteDescription;

export function getStructuredData() {
  return getStructuredDataForRegion(mokpoSeo, mokpoContent.faqItems);
}

export {
  getRegionPageUrl,
  getStructuredDataForRegion,
  gyeongsanSeo,
  mokpoSeo,
};
