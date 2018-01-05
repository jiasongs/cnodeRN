import React, { Component } from "react";
import { AppRegistry, View } from "react-native";
import Navigation from "./src/navigation/navigation";
import { Provider } from "react-redux";
import configureStore from "./src/store/configureStore";
import storage from './src/utils/asyncStorage';

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
console.log(storage);
global.storage = storage
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
