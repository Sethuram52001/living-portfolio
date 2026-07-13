import type { ExperiencePhase } from "@/lib/content/schemas";

export function formatDateRange(dateRange: ExperiencePhase["dateRange"]) {
  return `${formatMonth(dateRange.start)} — ${
    dateRange.end ? formatMonth(dateRange.end) : "Present"
  }`;
}

export function formatDate(date: string) {
  const parts = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(new Date(`${date}T00:00:00`));
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;
  const year = parts.find((part) => part.type === "year")?.value;

  return [month, day, year].filter(Boolean).join(" ");
}

function formatMonth(month: string) {
  const [year, monthIndex] = month.split("-");
  const date = new Date(Number(year), Number(monthIndex) - 1);

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}
