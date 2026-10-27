import site from "@/content/site.json";
import recommendations from "@/content/recommendations.json";

/**
 * The site URL is a TODO until the owner confirms the domain. Until then
 * sitemap, robots and metadata fall back to a placeholder so builds pass.
 */
export const SITE = site;

export const SITE_URL = site.siteUrl.startsWith("http")
  ? site.siteUrl
  : "https://example.com"; // TODO(owner): set real domain in content/site.json

/** A quote is publishable only when the recommender gave written permission. */
export function hasApprovedQuotes(): boolean {
  return recommendations.quotes.some(
    (q) => q.approved === true && !q.quote.startsWith("TODO(owner)"),
  );
}