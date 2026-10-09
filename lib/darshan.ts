import { temple } from "./temple";

export function getDarshanStatus(date = new Date()): string {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: temple.timeZone,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(date),
  );
  const { morning, evening } = temple.darshan;
  if (hour >= morning.opens && hour < morning.closes) {
    return "दर्शन समय के अनुसार · अभी प्रातः दर्शन का समय है";
  }
  if (hour >= evening.opens && hour < evening.closes) {
    return "दर्शन समय के अनुसार · अभी संध्या दर्शन का समय है";
  }
  if (hour >= morning.closes && hour < evening.opens) {
    return "अगला दर्शन समय · आज शाम 5:00 बजे";
  }
  return hour >= evening.closes
    ? "अगला दर्शन समय · कल सुबह 5:00 बजे"
    : "अगला दर्शन समय · आज सुबह 5:00 बजे";
}
