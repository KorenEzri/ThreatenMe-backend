import * as onions from '../utils/onion.util';
import { IPaste } from '../../types';
import { Pastes } from '../db/schemas';

export const getPastes = async (
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
export const getPastesWithoutLinks = async (
  pasteSiteLink: string,
  selector: string,
  attribute?: string,
) => {
  return await onions.scrapWebsite(pasteSiteLink, selector, attribute);
};
export const savePastesToDB = async (pastes: IPaste[]) => {
  const source = pastes[0]?.source;
  const doesExist = await Pastes.findOne({ source: source });
  if (doesExist) {
    try {
      await Pastes.updateOne({
        source: source,
        $addToSet: { pastes: { $each: pastes } },
      });
      return 'OK';
    } catch ({ message }) {
      console.log(
        'Error with savePastesToDB() at pastes.util.ts at ~line 25, ',
        message,
      );
      return 'ERROR';
    }
  } else {
    try {
      const newPaste = new Pastes({
        source: pastes[0]?.source,
        pastes: pastes,
      });
      await newPaste.save();
      return 'OK';
    } catch ({ message }) {
      console.log(
        'Error with savePastesToDB() at pastes.util.ts at ~line 25, ',
        message,
      );
      return 'ERROR';
    }
  }
};
