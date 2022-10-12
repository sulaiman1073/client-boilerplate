const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function dateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const dateFormatter = (date, min = false) => {
  const dateDifference = dateDiffInDays(date, new Date());

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const formatHours = hours =>
    hours === 0 ? "12" : hours > 12 ? `${hours - 12}` : `${hours}`;

  const formatMinutes = minutes =>
    minutes >= 10 ? `${minutes}` : `0${minutes}`;

  if (dateDifference === 0) {
    if (min) {
      return "Today";
    } else {
      return `Today ${formatHours(date.getHours())}:${formatMinutes(
        date.getMinutes()
      )} ${date.getHours() < 12 ? "AM" : "PM"}`;
    }
  }
  if (dateDifference === 1) {
    if (min) {
      return "Yesterday";
    } else {
      return `Yesterday ${formatHours(date.getHours())}:${formatMinutes(
        date.getMinutes()
      )} ${date.getHours() < 12 ? "AM" : "PM"}`;
    }
  }
  if (dateDifference > 1 && dateDifference <= 7) {
    if (min) {
      return `Last ${daysOfWeek[date.getDay()]}`;
    } else {
      return `Last ${daysOfWeek[date.getDay()]} ${formatHours(
        date.getHours()
      )}:${formatMinutes(date.getMinutes())} ${
        date.getHours() < 12 ? "AM" : "PM"
      }`;
    }
  }
  return `${
    monthOfYear[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

export default dateFormatter;
