import crypto from 'crypto';
import multer from 'multer';

import StringsFormatting from './strings-formatting';
import Validation from './validation';
import Collections from './collections';
import { ExpressRequest } from 'request';
import { networkInterfaces } from 'os';

export * from './date-formatting';

export { StringsFormatting, Validation, Collections };

export function randomIntegerInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomIntegers(length: number = 6): string {
  let randInt = '';
  while (length > 0) {
    randInt += crypto.randomInt(10);
    length--;
  }

  return randInt;
}

type digestTypes = 'base64' | 'hex';
export function hash(value: string, algo: string = 'sha256', digest: digestTypes = 'hex'): string {
  return crypto.createHash(algo).update(value).digest(digest);
}

export function hashCheck(
  value: string,
  hash: string,
  algo: string = 'sha256',
  digest: digestTypes = 'hex',
): boolean {
  return this.hash(value, algo, digest) === hash;
}

export function base64Encode(ascii: string): string {
  return Buffer.from(ascii).toString('base64');
}

export function base64Decode(base64: string): string {
  return Buffer.from(base64, 'base64').toString('ascii');
}

export async function extractImageFromRequest(
  request: ExpressRequest,
  fieldName: string,
): Promise<ExpressRequest['file']> {
  try {
    const multerSingle = multer().single(fieldName);

    return await new Promise((resolve, reject) => {
      multerSingle(request, undefined, async (error: unknown) => {
        if (error) {
          reject(error);
        }

        resolve(request.file);
      });
    });
  } catch (error) {
    throw error;
  }
  // TODO: check for supported file types & ensure its in supported list before saving
}

/**
 * Merge all objects passed without replacing existing key value
 *
 * @param args
 * @returns
 */
export function mergeObjects(...args: Array<{ [x: string]: any }>): {
  [x: string]: unknown;
} {
  if (args.length < 1) throw new TypeError('No parameter passed');

  const result = args[0] || {};

  for (let objIndex = 1; objIndex < args.length; objIndex++) {
    const currentObj = args[objIndex];
    for (const key in currentObj) {
      result[key] = result[key] || currentObj[key];
    }
  }

  return result;
}

/**
 * check if string contains numeric characters
 *
 * @param str
 * @returns
 */
export function isNumeric(str: string) {
  return !isNaN(Number(str));
}

export function getIPAddresses() {
  return Object.values(networkInterfaces())
    .flat()
    .filter(({ family, internal }) => family === 'IPv4' && !internal)
    .map(({ address }) => address);
}

export function formatTemplate(template: string, values: any): string {
  return template.replace(/\_\{(\w+)\}/g, function (match, cont) {
    return typeof values[cont] !== 'undefined' ? values[cont] : match;
  });
}

export const removeUndefined = (data: any) => {
  data = JSON.parse(JSON.stringify(data));
  return data;
};
