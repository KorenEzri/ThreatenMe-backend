import * as onions from '../utils/onion.util';
export const SortPastes = async (
  pasteSiteLink: string,
  selector: string,
  attribute?: string,
) => {
  const pasteLinks = await onions.scrapWebsite(pasteSiteLink, 'a');
  return await Promise.all(
    pasteLinks.map(async (link: string, index: number) => {
      const scraped = await onions.scrapWebsite(link, selector, attribute);
      return scraped;
    }),
  );
};
export const SortPastesWithoutLinks = async (
  pasteSiteLink: string,
  selector: string,
  attribute?: string,
) => {
  return await onions.scrapWebsite(pasteSiteLink, selector, attribute);
};
