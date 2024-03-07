export default class StringsFormatting {
  public static setPhoneToCorrectFormat(str: string): string {
    return str.replace(/\D/g, '');
  }

  public static snakeToCamel(str: string): string {
    return str.replace(
      /([-_][a-z])/g,
      (group) => group.toUpperCase().replace('-', '').replace('_', '')
    );
  }

  public static ucfirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public static toSlugCase(str: string): string {
    return str.replace(/ /g, '-').replace(/[^\w-]+/g, '').toLowerCase();
  }

  public static toSentenceCase(str: string): string {
    return str.replace(/[^a-zA-Z0-9 ]/g, '').trim();
  }

  public static toCamelCase(str: string): string {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
  }

  public static getFileExtension(str: string): string {
    return str.match(/\.[0-9a-zA-Z]+$/i)[0];
  }

  public static getRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  }

}
