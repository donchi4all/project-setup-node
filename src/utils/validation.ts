type ValidateObject = Record<string, unknown>;

export interface ValidateScheme {
  [key: string]: (value: unknown) => boolean;
}

export type ValidateResultItem = {
  value: unknown;
  isValid: boolean;
};

export type ValidateResult = {
  isValid: boolean;
  data: Record<string, ValidateResultItem>;
};

export default class Validation {
  public static validateObject(
    validateObj: ValidateObject,
    validateScheme: ValidateScheme,
  ): ValidateResult {
    return Object.entries(validateObj).reduce(
      (result, [key, value]) => {
        const isValid = validateScheme[key](value);
        result.isValid = result.isValid && isValid; // Discrete multiplication
        result.data = {
          ...result.data,
          [key]: { value, isValid },
        };
        return result;
      },
      { isValid: true, data: {} } as ValidateResult,
    );
  }
}
