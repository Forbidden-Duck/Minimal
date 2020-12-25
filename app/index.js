import document from "document";
import clock from "clock";
import userActivity from "user-activity";
import { display } from "display";
import { preferences, units } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as battery from "./battery.js";
import * as heartMonitor from "./hrm.js";
import * as util from "../common/utils";

console.log("Starter Clock Loaded!");

// Update the clock every second
clock.granularity = "seconds";

// Get labels
const timeLbl = document.getElementById("time");
const dateLbl = document.getElementById("date");
const stepsLbl = document.getElementById("steps");

// Initial variables
const dataTypes = ["steps", "distance", "calories"];

function updateType(type) {
  const typeLbl = document.getElementById(type);
  if (type === "distance") {
    typeLbl.text = `${(userActivity.today.adjusted[type] * 0.000621371192).toFixed(2)}${units.distance === "metric" ? "km" : "mi"}`;
  } else {
    typeLbl.text = userActivity.today.adjusted[type];
  }
}

function updateAllTypes() {
  for (const type of dataTypes) {
    updateType(type);
  }
}

clock.ontick = function (event) {
  const date = event.date;
  const hours = util.zeroPad(date.getHours());
  const minutes = util.zeroPad(date.getMinutes());
  timeLbl.text = `${hours}: ${minutes} `;
  dateLbl.text = util.getDateAsString();

  battery.setLevel();
  updateAllTypes();
}
heartMonitor.init();