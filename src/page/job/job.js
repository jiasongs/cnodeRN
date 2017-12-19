//import liraries
import React, { Component } from 'react';
import List from '../../components/list';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';

// create a component
class Job extends Component {
  static navigationOptions = ({ navigation }) => {
    return {

    };
  }
  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <List name='job' navigate={navigate} />
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
export default Job;
