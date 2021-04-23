import document from "document";
import clock from "clock";
import userActivity from "user-activity";
import { display } from "display";
import { preferences, units } from "user-settings";
import { HeartRateSensor } from "heart-rate";
import * as battery from "./battery.js";
import * as heartMonitor from "./hrm.js";
import * as util from "../common/utils";
import * as messaging from "messaging";
import * as Config from "../common/config.js";

let use24hour = true;

console.log("Minimal Loaded!");

// Update the clock every second
clock.granularity = "seconds";

// Get labels
const timeLbl = document.getElementById("time");
const timeSuffixLbl = document.getElementById("timeSuffix");
const dateLbl = document.getElementById("date");
const stepsLbl = document.getElementById("steps");

// Initial variables
const dataTypes = ["steps", "distance", "calories"];

function updateType(type) {
  const typeLbl = document.getElementById(type);
  if (type === "distance") {
    if (units.distance === "metric") {
      typeLbl.text = `${(userActivity.today.adjusted[type] / 1000).toFixed(2)}km`;
    } else {
      typeLbl.text = `${(userActivity.today.adjusted[type] / 1609).toFixed(2)}mi`;
    }
  } else {
    typeLbl.text = userActivity.today.adjusted[type].toLocaleString("en-US");
  }
}

function updateAllTypes() {
  for (const type of dataTypes) {
    updateType(type);
  }
}

clock.ontick = function (event) {
  const date = event.date;
  if (use24hour) {
    const hours = util.zeroPad(date.getHours());
    const minutes = util.zeroPad(date.getMinutes());
    timeLbl.text = `${hours}:${minutes} `;
    timeSuffixLbl.text = "";
  } else {
    const hours = util.zeroPad(date.getHours());
    const minutes = util.zeroPad(date.getMinutes());
    const conversion = util.convert24hoursto12(`${hours}:${minutes}`);
    timeLbl.text = conversion.time;
    timeSuffixLbl.text = conversion.suffix;
  }
}
dateLbl.text = util.getDateAsString();

battery.setLevel();
updateAllTypes();
heartMonitor.init();

messaging.peerSocket.onmessage = function (event) {
  if (event.data.key === "toggle") {
    use24hour = event.data.value;
    Config.set("toggle", event.data.value);
    Config.save();
  }
}

function initConfig() {
  if (Config.load()) {
    use24hour = Config.get("toggle");
  }
}
initConfig();