import React, { Component } from "react";
import { AppRegistry, Platform, Alert } from "react-native";
import './src/utils/global'
import Navigation from "./src/navigation/navigation";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import JPushModule from 'jpush-react-native';

if (!__DEV__) {
  global.console = {
    info: () => { },
    log: () => { },
    warn: () => { },
    debug: () => { },
    error: () => { }
  };
} else {
  console.log("kaifa");
}

JPushModule.notifyJSDidLoad((resultCode) => {
  console.log(resultCode)
  if (resultCode === 0) { console.log('success') }
});
JPushModule.addReceiveCustomMsgListener((map) => {
  console.log("extras: " + map.extras);
});
JPushModule.addReceiveNotificationListener((map) => {
  console.log("alertContent: " + map.alertContent);
  console.log("extras: " + map.extras);
  // var extra = JSON.parse(map.extras);
  // console.log(extra.key + ": " + extra.value);
});
JPushModule.addReceiveOpenNotificationListener((map) => {
  console.log("Opening notification!");
  console.log("map.extra: " + map.extras);
  // JPushModule.jumpToPushActivity("SecondActivity");
});
JPushModule.addGetRegistrationIdListener((registrationId) => {
  console.log("Device register succeed, registrationId " + registrationId);
});

const store = configureStore();
export default class cnodeRN extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("cnodeRN", () => cnodeRN);
