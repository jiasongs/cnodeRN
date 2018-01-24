import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import React, { Component } from "react";
import { } from '../utils/global'
import Home from "../page/home/home";
import Find from "../page/Find/find";
import Notice from "../page/notice/notice";
import Mine from "../page/mine/mine";
import Detail from "../page/detail/detail";
import Login from "../page/login/login";
import QRCode from "../page/login/qrcode";
import UserInfo from "../page/mine/userInfo";
import { Recently } from '../page/mine/recently';
import SysMessage from '../page/notice/sysMessage';
import ToastExample from '../page/ToastExample';
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
} from "react-native";

const Tabs = TabNavigator(
  {
    Main: {
      screen: Home,
      navigationOptions: {
        title: "首页",
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            resizeMode="contain"
            style={{ height: 26, width: 26 }}
            source={
              !focused
                ? require("../resource/images/home_normal.png")
                : require("../resource/images/home_selected.png")
            }
          />
        )
      }
    },
    Find: {
      screen: Find,
      navigationOptions: {
        header: null,


      },
    },
    Notice: {
      screen: Notice,
      navigationOptions: {
        title: "通知",
        // tabBarIcon: ({ focused, tintColor }) => (
        //   <Image
        //     resizeMode="contain"
        //     style={{ height: 24, width: 24 }}
        //     source={
        //       !focused
        //         ? require("../resource/images/notice_normal.png")
        //         : require("../resource/images/notice_selected.png")
        //     }
        //   />
        // )
      }
    },
    Mine: {
      screen: Mine,
      navigationOptions: {
        title: "我的",
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            resizeMode="contain"
            style={{ height: 37, width: 37 }}
            source={
              !focused
                ? require("../resource/images/mine_normal.png")
                : require("../resource/images/mine_selected.png")
            }
          />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      indicatorStyle: { height: 0 },
      activeTintColor: "#0085da",
      style: {
        backgroundColor: "#fff"
      },
      tabStyle: {
        margin: 2,
      },
      labelStyle: {
        fontSize: FONT_SIZE(9),
      },
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: "bottom",
    tabBarComponent: TabBarBottom
  }
);

const Navigation = StackNavigator(
  {
    Tabs: { screen: Tabs },
    Detail: { screen: Detail },
    QRCode: { screen: QRCode },
    UserInfo: { screen: UserInfo },
    Recently: { screen: Recently },
    SysMessage: { screen: SysMessage },
    ToastExample: { screen: ToastExample },
    Login: {
      screen: Login,
    },
    // ModalNavigation: { screen: ModalNavigation },
  },
  {
    mode: 'card',
    // initialRouteName: "Tabs",
    headerMode: "float",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2D2D2D",
      },
      headerTitleStyle: {
        alignSelf: "center",
        fontSize: FONT_SIZE(15),
      },
      // headerBackTitle: null,
      headerTintColor: "#FFFFFF",
      gesturesEnabled: true
    },
  }
);
const ModalNavigation = StackNavigator({
  // Navigation: {
  //   screen: Navigation,
  // },
  Login: {
    screen: Login,
  },
}, {
    mode: 'modal',
    // initialRouteName: "Login",
    // headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2D2D2D",
      },
      headerTitleStyle: {
        alignSelf: "center",
      },
      // headerBackTitle: null,
      headerTintColor: "#FFFFFF",
      gesturesEnabled: true
    },
  });
const AppNavigation = StackNavigator({
  Navigation: { screen: Navigation },
  ModalNavigation: { screen: ModalNavigation },
}, {
    mode: 'modal',
    initialRouteName: "Navigation",
    headerMode: "none",
    // navigationOptions: {
    //   headerStyle: {
    //     backgroundColor: "#2D2D2D",
    //   },
    //   headerTitleStyle: {
    //     alignSelf: "center",
    //   },
    //   // headerBackTitle: null,
    //   headerTintColor: "#FFFFFF",
    //   gesturesEnabled: true
    // },
  });
export default Navigation;
