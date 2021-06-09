import * as onions from '../utils/onion.util';
import { IPaste } from '../../types';
import { Paste } from '../db/schemas';
import { pasteSchema } from '../validations';

export const generateHash = (title: string, body: string): string => {
  const wordToHash = title + body;
  let hash = 0,
    i,
    chr;
  if (wordToHash.length === 0) return `${hash}`;
  for (i = 0; i < wordToHash.length; i++) {
    chr = wordToHash.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return `${hash}`;
};
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

const validateAndGenerateHashfromPastes = (pastes: IPaste[]): IPaste[] => {
  const formattedPastes = [];
  for (let i = 0; i < pastes.length; i++) {
    const currentPaste = pastes[i];
    const isValid = pasteSchema.validate(currentPaste);
    if (!isValid) continue;
    const { title, body } = currentPaste;
    const formattedPaste = {
      ...currentPaste,
      uniqueIdentifier: generateHash(title, body),
    };
    formattedPastes.push(formattedPaste);
  }
  return formattedPastes;
};
export const savePastesToDB = async (pastes: IPaste[]) => {
  const formattedPastes = validateAndGenerateHashfromPastes(pastes);
  try {
    await Paste.insertMany(formattedPastes, { ordered: false });
    return 'OK';
  } catch ({ message }) {
    console.log(message);
    return 'ERROR';
  }
};
