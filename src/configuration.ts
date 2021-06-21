import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const FILE = 'config.yaml';

export default (): Record<string, unknown> => {
  return yaml.load(
    readFileSync(join(process.cwd(), 'config', FILE), 'utf8'),
  ) as Record<string, unknown>;
};
