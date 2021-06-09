import { savePastesToDB } from './pastes.util';

export const strongholdUrls = [
  'http://nzxj65x32vh2fkhk.onion/all',
  'http://nzxj65x32vh2fkhk.onion/all?page=2',
  'http://nzxj65x32vh2fkhk.onion/all?page=3',
];
const rules = {
  ignore: ['preview', 'Show paste', ''],
};

export const ParseAndSaveStrongholdData = async (data: any) => {
  const parsed = data
    .map((paste: string) => {
      if (paste.split(' ').length > 2) {
        return ParseInnerText(paste, 'Stronghold');
      }
    })
    .filter((el: string) => {
      return el != null;
    })
    .flat(1);
  const saved = await savePastesToDB(parsed);
  return { parsed, status: saved };
};
export const ParseAndSaveDeeppasteData = async (data: any) => {};
const ParseInnerText = (text: string, source: string) => {
  try {
    const splat = text.split('\n');
    if (splat.length < 3) return;
    const filtered = splat.filter(line => !rules.ignore.includes(line));
    const parsedData = filtered.map((line: string, index: number) => {
      if (filtered && filtered[0])
        return {
          source: source,
          title: filtered[0],
          language: filtered[filtered.length - 1],
          posted_by: filtered[filtered.length - 2],
          body: filtered.slice(1, -2).join('\n'),
        };
    });
    const uniqueArray = parsedData.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return (
        index ===
        parsedData.findIndex(obj => {
          return JSON.stringify(obj) === _thing;
        })
      );
    });
    return uniqueArray;
  } catch ({ message }) {
    console.log(message);
  }
};
