import moment from "moment";

export function normalizedDate(value: string | null, format = "YYYY-MM-DD") {
  return value ? moment.utc(value).format(format) : null;
}
