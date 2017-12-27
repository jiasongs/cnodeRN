import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import React, { Component } from 'react';
import Home from '../page/home/home';
import Find from '../page/Find/find';
import Notice from '../page/notice/notice';
import Mine from '../page/mine/mine';
import Detail from '../page/detail/detail'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  ScrollView,
  Image,
  SectionList,
  TouchableOpacity
} from 'react-native';

const Tabs = TabNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      title: '首页',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={{ height: 26, width: 26 }}
          source={!focused ? require('../resource/images/home_normal.png') : require('../resource/images/home_selected.png')} />
      ),
    }
  },
  Find: {
    screen: Find,
    navigationOptions: {
      tabBarLabel: '发现',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={{ height: 26, width: 26 }}
          source={!focused ? require('../resource/images/job_normal.png') : require('../resource/images/job_selected.png')}
        />
      ),
    }
  },
  Notice: {
    screen: Notice,
    navigationOptions: {
      title: '通知',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={{ height: 24, width: 24 }}
          source={!focused ? require('../resource/images/notice_normal.png') : require('../resource/images/notice_selected.png')}
        />
      ),
    }
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      title: '我的',
      tabBarIcon: ({ focused, tintColor }) => (
        <Image
          resizeMode="contain"
          style={{ height: 37, width: 37 }}
          source={!focused ? require('../resource/images/mine_normal.png') : require('../resource/images/mine_selected.png')}
        />
      ),
    }
  },
}, {
    tabBarOptions: {
      indicatorStyle: { height: 0 },
      activeTintColor: '#0085da',
      style: {
        backgroundColor: '#fff',
      },
      showIcon: true,
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: 'bottom',
    tabBarComponent: TabBarBottom,
  })
const Navigation = StackNavigator({
  Tabs: { screen: Tabs },
  Detail: { screen: Detail },
}, {
    initialRouteName: 'Tabs',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#2D2D2D',
      },
      // headerBackTitle: null,
      headerTintColor: '#FFFFFF',
      gesturesEnabled: true,
    },
    headerMode: 'screen',
    transitionConfig: () => ({
      screenInterpolator: CardStackStyleInterpolator.forHorizontal,
    })
  });
export default Navigation;