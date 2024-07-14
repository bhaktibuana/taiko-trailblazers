import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const secondsToHms = (seconds: number) => {
  const duration = dayjs.duration(seconds, "seconds");
  const hours = Math.floor(duration.asHours());
  const minutes = Math.floor(duration.minutes());
  const sec = Math.floor(duration.seconds());
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};
