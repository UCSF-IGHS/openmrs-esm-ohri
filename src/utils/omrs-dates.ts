import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function toOmrsDateString(date: Date, toUTC = false): string {
  let d = dayjs(date);
  if (toUTC) {
    d = d.utc();
  }
  return d.format('YYYY-MM-DDTHH:mm:ss.SSSZZ');
}
