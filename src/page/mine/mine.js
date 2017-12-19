//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';

// create a component
class Setting extends Component {
  static navigationOptions = ({ navigation }) => {
    return {

    };
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text>Setting</Text>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Setting;
