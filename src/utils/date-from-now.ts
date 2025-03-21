export function timeAgo(isoDate: string) {
  const date = new Date(isoDate);
  const now = new Date();
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const unit in intervals) {
    const count = Math.floor(
      seconds / intervals[unit as keyof typeof intervals],
    );
    if (count > 0) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
