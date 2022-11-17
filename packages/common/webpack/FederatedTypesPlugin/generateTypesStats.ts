import crypto from 'crypto';

import type { NormalizeOptions } from './normalizeOptions';

export default function generateTypesStats(filesMap: Record<string, string>, normalizeOptions: NormalizeOptions) {
  return Object.entries(filesMap).reduce<Record<string, string>>((acc, [path, contents]) => {
    const filename = path.slice(`${normalizeOptions.distDir}/`.length);

    return {
      ...acc,
      [filename]: crypto.createHash('md5').update(contents).digest('hex'),
    };
  }, {});
}
