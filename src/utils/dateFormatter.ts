import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/fr";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('fr');
export default function dateFormatter(date: string): string {
    const localTimezone = localStorage.getItem("timezone") || "UTC";
    return dayjs.utc(date).tz(localTimezone).format("DD MMMM YYYY");
}