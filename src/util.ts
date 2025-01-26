import { format } from "date-fns";

export function formattedDate(date: Date) {
  function getOrdinal(num: number) {
    const suffixes = ["th", "st", "nd", "rd"];
    const val = num % 100;
    return num + (suffixes[(val - 20) % 10] || suffixes[val] || suffixes[0]);
  }

  const formattedDate = `${
    format(date, "MMMM ") + getOrdinal(date.getDate())
  } ${format(date, "yyyy")}`;

  return formattedDate;
}

export function getTimeNow() {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/London",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
}
