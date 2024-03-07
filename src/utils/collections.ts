import { CommonErrorHandler } from '../modules/exceptions';

type DefaultObject = Record<string, unknown>;

export default class Collections {
  /**
   * Sorting a collection of objects by specific key and order
   * @param collection
   * @param key - specific key for sorting
   * @param order - sorting order
   * @returns sorted collection
   */
  public static sortArrayOfObjectsByKey<T extends DefaultObject> (
    collection: Array<T>,
    key: string,
    order: 'ASC' | 'DESC',
  ): Array<T> {
    try {
      const compare = (a: T, b: T): 1 | -1 | 0 => {
        let aValue: unknown = a[key];
        let bValue: unknown = b[key];

        /**
         * NOTE:
         * The condition "value == null" checks just on 'undefined' and 'null'
         * e.g. values '', '0', 'NaN' and 'false' will be passed
         */
        if (aValue == null || bValue == null) {
          throw new CommonErrorHandler({
            status: 500,
            code: 'FATAL',
            message: `Sorting Error: an object does not include transmitted property "${key}" or the value is NULL`,
          });
        }

        if (typeof aValue === 'object') {
          const aKeys = Object.keys(aValue as DefaultObject);
          aValue = (aValue as DefaultObject)[aKeys.includes(key) ? key : aKeys[0]];
        }
        if (typeof bValue === 'object') {
          const bKeys = Object.keys(bValue as DefaultObject);
          bValue = (bValue as DefaultObject)[bKeys.includes(key) ? key : bKeys[0]];
        }

        if (aValue < bValue) {
          return order === 'ASC' ? -1 : 1;
        }
        if (aValue > bValue) {
          return order === 'ASC' ? 1 : -1;
        }
        return 0;
      };
      
      return collection.sort(compare);
    } catch (err) {
      throw err;
    }
  }

  public static compareObjects (a: unknown, b: unknown, caseSensitive: boolean = true): boolean {
    const sortObjProperties = (obj: DefaultObject) =>
      Object.keys(obj)
        .sort()
        .reduce((result: DefaultObject, key: string) => {
          let value = obj[key];
          if (obj[key]) {
            if (!caseSensitive && typeof obj[key] === 'string') {
              value = (obj[key] as string).toLowerCase();
            }
            if (typeof obj[key] === 'object') {
              value = sortObjProperties(obj[key] as DefaultObject);
            }
            if (typeof obj[key] === 'function') {
              value = (obj[key] as (...args: unknown[]) => unknown).toString();
            }
          }
          return {
            ...result,
            [key]: value,
          };
        }, {});
  
    if (a === b) {
      return true;
    }
    if (a === null || b === null) {
      return false;
    }
    if (typeof a !== typeof b) {
      return false;
    }
    if (typeof a !== 'object') {
      if (!caseSensitive) {
        return `${a}`.toLowerCase() === `${b}`.toLowerCase();
      }
      return `${a}` === `${b}`;
    }
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }
  
    return JSON.stringify(sortObjProperties(a as DefaultObject))
      === JSON.stringify(sortObjProperties(b as DefaultObject));
  }
}