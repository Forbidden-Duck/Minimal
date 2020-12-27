import { me } from "appbit";
import document from "document";
import { HeartRateSensor } from "heart-rate";
import { display } from "display";

// Set initial variables
let hrm, interval;

// Get labels
const heartrateLbl = document.getElementById("heart-rate");

export function init() {
    if (me.permissions.granted("access_heart_rate")) {
        hrm = new HeartRateSensor();
        hrmSetup();
        startHRM();
    } else {
        console.log("No heart_rate permission");
        heartrateLbl.text = "---";
    }
}

function getHRM() {
    heartrateLbl.text =
        hrm.heartRate
            ? parseInt(hrm.heartRate) >= 20
                ? hrm.heartRate
                : "---"
            : "---";
}

function hrmSetup() {
    display.addEventListener("change", function () {
        if (display.on) {
            startHRM();
        } else {
            stopHRM();
        }
    });
}

function startHRM() {
    if (!interval) {
        hrm.start();
        getHRM();
        interval = setInterval(getHRM, 1000);
    }
}

function stopHRM() {
    hrm.stop();
    clearInterval(interval);
    interval = undefined;
}