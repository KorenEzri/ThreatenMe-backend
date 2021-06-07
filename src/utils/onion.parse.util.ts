const rules = {
  ignore: ['preview', 'Show paste', ''],
};

export const ParseInnerText = (text: string) => {
  try {
    const splat = text.split('\n');
    if (splat.length < 3) return;
    const filtered = splat.filter(line => !rules.ignore.includes(line));
    const parsedData = filtered.map((line: string, index: number) => {
      if (filtered && filtered[0])
        return {
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
