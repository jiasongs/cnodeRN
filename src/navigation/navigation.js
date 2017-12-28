import { StackNavigator, TabNavigator, TabBarBottom } from "react-navigation";
import CardStackStyleInterpolator from "react-navigation/src/views/CardStack/CardStackStyleInterpolator";
import React, { Component } from "react";
import Home from "../page/home/home";
import Find from "../page/Find/find";
import Notice from "../page/notice/notice";
import Mine from "../page/mine/mine";
import Detail from "../page/detail/detail";
import Login from "../page/login/login";
import QRCode from "../page/login/qrcode";
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
        tabBarLabel: "发现",
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            resizeMode="contain"
            style={{ height: 28, width: 28 }}
            source={
              !focused
                ? require("../resource/images/find_normal.png")
                : require("../resource/images/find_selected.png")
            }
          />
        )
      }
    },
    Notice: {
      screen: Notice,
      navigationOptions: {
        title: "通知",
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            resizeMode="contain"
            style={{ height: 24, width: 24 }}
            source={
              !focused
                ? require("../resource/images/notice_normal.png")
                : require("../resource/images/notice_selected.png")
            }
          />
        )
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
      indicatorStyle: { height: 0 },
      activeTintColor: "#0085da",
      style: {
        backgroundColor: "#fff"
      },
      showIcon: true
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
    Login: { screen: Login },
    QRCode: {
      screen: QRCode
    }
  },
  {
    // mode:'modal',
    initialRouteName: "Tabs",
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#2D2D2D"
      },
      headerTitleStyle: {
        alignSelf: "center"
      },
      // headerBackTitle: null,
      headerTintColor: "#FFFFFF",
      gesturesEnabled: true
    },
    transitionConfig: () => ({
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index, route } = scene;
        const params = route.params || {};
        const transition = params.transition || "forHorizontal";
        console.log(layout);
        if (params.transition === "forVertical") {
          // 垂直 模态
          const height = layout.initHeight;
          const translateY = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [height, 0, 0]
          });
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          });
          return { opacity, transform: [{ translateY }] };
        } else {
          return CardStackStyleInterpolator[transition](sceneProps);
        }
        // const { scene } = sceneProps;
        // const { route } = scene;
        // const params = route.params || {};
        // const transition = params.transition || "forHorizontal";
        // console.log(transition);
        //
        // return CardStackStyleInterpolator[transition](sceneProps);
      }
    })
  }
);
export default Navigation;
