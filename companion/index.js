import { settingsStorage } from "settings";
import * as messaging from "messaging";

settingsStorage.setItem("toggle", true);

settingsStorage.onchange = function (event) {
    if (event.newValue !== event.oldValue) {
        sendValue(event.key, event.newValue);
    }
}

function sendValue(key, value) {
    if (!key || !value) {
        return;
    }
    sendSettingData({
        key: key,
        value: JSON.parse(value)
    });
}

function sendSettingData(data) {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send(data);
    } else {
        console.log("No peerSocket connection");
    }
}