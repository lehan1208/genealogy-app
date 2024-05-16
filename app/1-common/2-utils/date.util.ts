import dayjs from "dayjs";

export default class DateTimeUtils {
  static formatDate(date: string) {
    if (date.includes("/") && date.split("/").length > 2) {
      return dayjs(date).format("DD/MM/YYYY")
    } else {
      // year only
      date = `${date}-01-01`;
      return dayjs(date).isValid() ? dayjs(date).year() : "Invalid Time";
    }
  }
}