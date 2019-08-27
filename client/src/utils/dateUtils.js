import moment from 'moment';

const DEFAULT_DATE_FORMAT = 'MM/DD/YYYY';

export const INPUT_DATE_FORMAT = 'YYYY-MM-DD';

export const getFormattedDateFromUtcString = (utcDateString, format = DEFAULT_DATE_FORMAT) => {
  try {
    return moment(utcDateString).utc().format(format);
  } catch (err) {
    return utcDateString;
  }
};
