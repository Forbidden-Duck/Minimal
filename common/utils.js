const MONTHS =
  [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP",
    "OCT", "NOV", "DEC"
  ];

const DAYS =
  [
    "MON", "TUE", "WED",
    "THU", "FRI", "SAT",
    "SUN"
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
  return DAYS[new Date().getDay() - 1];
}

export function getDay() {
  return zeroPad(new Date().getDate());
}

export function getDateAsString() {
  return `${getDayStr()} ${getMonth()} ${ordinalSuffix(getDay())}`;
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