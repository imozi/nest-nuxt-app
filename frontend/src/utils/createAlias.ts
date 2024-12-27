import { transliterate, slugify } from 'transliteration';

export const createAlias = (str: string | undefined) => {
  const translitName = transliterate(str!);
  const repl = slugify(translitName, {
    separator: '-',
    trim: true,
    lowercase: true,
  });

  return repl;
};
