export default class HelperOutput {
  static getAbbr(str, maxChar = 25) {
    if (typeof str !== 'string') {
      return '';
    }
    let abbr = str;
    if (str.length > parseInt(maxChar, 10)) {
      const shortenStr = this.getShortenStr(str, maxChar);
      abbr = `<abbr title="${str}">${shortenStr} ...</abbr>`;
    }
    return abbr;
  }

  static getShortenStr(str, maxChar = 25) {
    if (typeof str !== 'string') {
      return '';
    }

    return str.substr(0, maxChar);
  }

  static getCapitalizedStr(str) {
    if (typeof str !== 'string') {
      return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
