import * as onions from '../utils/onion.util';
export const SortPastes = async (
  pasteSiteLink: string,
  selector: string,
  attribute?: string,
) => {
  const pasteLinks = await onions.scrapWebsite(pasteSiteLink, 'a');
  // const newPastes = await onions.scrapWebsite(
  //     'http://paste6kr6ttc5chv.onion/top.php',
  //     'a',
  //   );
  //   const scrapedData = await onions.scrapWebsite(
  //     'http://paste6kr6ttc5chv.onion/show.php?md5=1ada8ed7b21189b5f45f9eac64bebf38',
  //     'textarea.boxes',
  //     'textContent',
  //   );
  return await Promise.all(
    pasteLinks.map(async (link: string, index: number) => {
      return await onions.scrapWebsite(link, selector, attribute);
    }),
  );
};
