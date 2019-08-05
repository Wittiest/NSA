import fs from 'fs';

const BLACKLIST_FILENAME = 'WORD_WATCH_LIST.csv';

export const parseBlacklist = () => {
  const rawBlacklist = fs.readFileSync(BLACKLIST_FILENAME, {encoding: 'utf-8'});
  
  return rawBlacklist.split('\n');
}
