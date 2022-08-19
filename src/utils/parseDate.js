import moment from 'moment';
import { DATE_FORMAT } from '../constants';

export const parseDate = ({ year, month, day }) => {
  return moment(`${year}-${month}-${day} 00:00:00`, DATE_FORMAT).unix();
};

export const parseNormalizedDate = (date) => {
  return moment(date, DATE_FORMAT).unix();
};
