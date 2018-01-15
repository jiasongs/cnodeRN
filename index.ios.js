import React, { Component } from "react";
import { AppRegistry, View, Alert, Platform } from "react-native";
import ModalNavigation from "./src/navigation/navigation";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import storage from './src/utils/asyncStorage';
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
  console.log("Dev");
}
if (Platform.OS == 'android') {
  JPushModule.notifyJSDidLoad((resultCode) => {
    if (resultCode === 0) { console.log('success') }
  });
}
JPushModule.addnetworkDidLoginListener(() => {
  console.log('连接已登录')
  // JPushModule.addTags(['dasffas'], (result) => {
  //   Alert.alert('addTags success:' + JSON.stringify(result))
  // })
})
JPushModule.addOpenNotificationLaunchAppListener((result) => {
  // 
  Alert.alert('addOpenNotificationLaunchAppListener', 'the notification is :' + JSON.stringify(result))
})

JPushModule.addReceiveOpenNotificationListener((result) => {
  // 点击通知栏进入
  JPushModule.setBadge(0, (success) => { console.log('setBadge:' + success) });
  console.log('1111')
  Alert.alert('addReceiveOpenNotificationListener', JSON.stringify(result))
})

JPushModule.addReceiveNotificationListener((result) => {
  // 收到远程通知
  Alert.alert('addReceiveNotificationListener', JSON.stringify(result))
})

JPushModule.addConnectionChangeListener((result) => {
  if (result) {
    console.log('网络已连接')
  } else {
    console.log('网络已断开')
  }
})
console.log(storage);
global.storage = storage
const store = configureStore();
export default class cnodeRN extends Component {
  render() {
    return (
      <Provider store={store}>
        <ModalNavigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("cnodeRN", () => cnodeRN);
