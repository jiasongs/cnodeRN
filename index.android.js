import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation/navigation';
if (!__DEV__) {
  global.console = {
    info: () => { },
    log: () => { },
    warn: () => { },
    debug: () => { },
    error: () => { },
  };
} else {
  console.log('kaifa')
}
export default class cnodeRN extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

AppRegistry.registerComponent('cnodeRN', () => cnodeRN);
