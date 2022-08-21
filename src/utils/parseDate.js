import moment from 'moment';
import { DATE_FORMAT } from '../constants';

export const parseDate = ({ year, month, day }, time = '00:00:00') => {
  return moment(`${year}-${month}-${day} ${time}`, DATE_FORMAT).unix();
};

export const parseNormalizedDate = (date) => {
  return moment(date, DATE_FORMAT).unix();
};
