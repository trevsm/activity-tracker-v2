// function to get hours, minutes, and seconds between two dates
export function getTimeBetween(startDate: Date, endDate: Date) {
  let diff = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);
  return {
    hours,
    minutes,
    seconds,
  };
}
