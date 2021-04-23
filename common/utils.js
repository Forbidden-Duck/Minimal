const MONTHS =
  [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP",
    "OCT", "NOV", "DEC"
  ];

const DAYS =
  [
    "SUN", "MON", "TUE",
    "WED", "THU", "FRI",
    "SAT"
  ];

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function getMonth() {
  return MONTHS[new Date().getMonth()];
}

export function getDayStr() {
  return DAYS[new Date().getDay()];
}

export function getDay() {
  return zeroPad(new Date().getDate());
}

export function getDateAsString() {
  return `${getDayStr()} ${getMonth()} ${ordinalSuffix(getDay())}`;
}

/**
 * https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
 */
export function convert24hoursto12(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
  let suffix = "";

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    suffix = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return { time: time.join(''), suffix: suffix }; // return adjusted time of original string
}

export function ordinalSuffix(day) {
  const
    j = day % 10,
    k = day % 100;

  if (j == 1 && k !== 11) {
    return day + "st";
  }
  if (j == 2 && k != 12) {
    return day + "nd";
  }
  if (j == 3 && j != 13) {
    return day + "rd";
  }
  return day + "th";
}