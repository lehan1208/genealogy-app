import dayjs from "dayjs";

export default class DateTimeUtils {
  static formatDate(date: string) {
    return dayjs(date).format("DD/MM/YYYY")
  }
}