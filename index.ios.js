import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './src/navigation/navigation';

export default class cnodeRN extends Component {
  render() {
    return (
      <Navigation />
    );
  }
}

AppRegistry.registerComponent('cnodeRN', () => cnodeRN);
