import { info, startGroup } from '@nx-tools/core';
import csvparse from 'csv-parse/lib/sync';
import { GROUP_PREFIX } from './constants';

export interface Flavor {
  latest: string;
  prefix: string;
  prefixLatest: boolean;
  suffix: string;
  suffixLatest: boolean;
}

export function Transform(inputs: string[]): Flavor {
  const flavor: Flavor = {
    latest: 'auto',
    prefix: '',
    prefixLatest: false,
    suffix: '',
    suffixLatest: false,
  };

  for (const input of inputs) {
    const fields = csvparse(input, {
      relaxColumnCount: true,
      skipLinesWithEmptyValues: true,
    })[0];
    let onlatestfor = '';
    for (const field of fields) {
      const parts = field.toString().split('=', 2);
      if (parts.length == 1) {
        throw new Error(`Invalid flavor entry: ${input}`);
      }
      switch (parts[0]) {
        case 'latest': {
          flavor.latest = parts[1];
          if (!['auto', 'true', 'false'].includes(flavor.latest)) {
            throw new Error(`Invalid latest flavor entry: ${input}`);
          }
          break;
        }
        case 'prefix': {
          flavor.prefix = parts[1];
          onlatestfor = 'prefix';
          break;
        }
        case 'suffix': {
          flavor.suffix = parts[1];
          onlatestfor = 'suffix';
          break;
        }
        case 'onlatest': {
          if (!['true', 'false'].includes(parts[1])) {
            throw new Error(`Invalid value for onlatest attribute: ${parts[1]}`);
          }
          switch (onlatestfor) {
            case 'prefix': {
              flavor.prefixLatest = /true/i.test(parts[1]);
              break;
            }
            case 'suffix': {
              flavor.suffixLatest = /true/i.test(parts[1]);
              break;
            }
          }
          break;
        }
        default: {
          throw new Error(`Unknown flavor entry: ${input}`);
        }
      }
    }
  }

  startGroup(`Processing flavor input`, GROUP_PREFIX);
  info(`latest=${flavor.latest}`);
  info(`prefix=${flavor.prefix}`);
  info(`prefixLatest=${flavor.prefixLatest}`);
  info(`suffix=${flavor.suffix}`);
  info(`suffixLatest=${flavor.suffixLatest}`);

  return flavor;
}
