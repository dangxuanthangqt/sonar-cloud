/* eslint-disable no-bitwise */
/* eslint-disable func-names */
export const handleRegexWithSpecialCharacters = (string) =>
  string.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');

export const formatHint = (string) => string.replace(/\n/gm, '<br/><br/>');

export const getDateFormatString = () => {
  const locale = window.navigator.userLanguage || window.navigator.language;
  const formatObj = new Intl.DateTimeFormat(locale).formatToParts(new Date());

  return formatObj
    .map((obj) => {
      switch (obj.type) {
        case 'day':
          return 'dd';
        case 'month':
          return 'MM';
        case 'year':
          return 'yyyy';
        default:
          return obj.value;
      }
    })
    .join('');
};

export const truncateString = (str = '', num = 100) => {
  if (str.length > num) {
    return `${str.slice(0, num)} ...`;
  }

  return str;
};

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
