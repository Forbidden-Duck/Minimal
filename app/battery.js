import document from "document";
import { battery } from "power";

// Get labels
const batteryLbl = document.getElementById("battery");

export function setLevel() {
    batteryLbl.text = `${battery.chargeLevel}%`;
}