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
      //标题
      title: '招聘',
      tabBarIcon: ({ focused, tintColor }) => {
        // <Image
        //   resizeMode="contain"
        //   style={[styles.iconBtn, { tintColor: tintColor }]}
        //   source={!focused ? require('../../assets/images/zone0.png') : require('../../assets/images/zone1.png')}
        // />
      },
      //是否允许右滑返回，在iOS上默认为true，在Android上默认为false
      cardStack: {
        gesturesEnabled: true,
      },
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <List name='job' />
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
