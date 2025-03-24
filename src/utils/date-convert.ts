export function formatDateFromISOString(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  const day = String(date.getUTCDate()).padStart(2, "0");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[date.getUTCMonth()];

  const year = date.getUTCFullYear();

  return `${month} ${day}, ${year}`;
}
