//import liraries
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  SectionList,
  TouchableHighlight
} from "react-native";
import Separator from "../../components/separator";
import * as types from '../../constants/actionTypes'
import { sendLogin, exitLogin } from "../../actions/login";
import { getUserRecently, getUserFavorites } from "../../actions/user";
// create a component
class Mine extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    console.log(state.key);
    return {};
  };
  componentWillMount() {

  }
  _onLoginPress(info) {
    const { user, isLogin } = this.props;
    console.log(user.loginname)
    if (isLogin) {
      this.props.navigation.navigate("UserInfo", { userName: user.loginname });
    } else {
      this.props.navigation.navigate("Login");
    }
  }
  _onPressItem(info) {
    const { recently, isLogin, favorites } = this.props;
    console.log('favorites')
    console.log(favorites)
    if (!isLogin) {
      alert('请先登录！')
      return;
    }
    switch (info.item.name) {
      case "最近回复":
        this.props.navigation.navigate("Recently", { recently: recently.recent_replies, type: '最近回复' });
        break;
      case "最新发布":
        this.props.navigation.navigate("Recently", { recently: recently.recent_topics, type: '最新发布' });
        break;
      case "话题收藏":
        this.props.navigation.navigate("Recently", { recently: favorites, type: '话题收藏' });
        break;
      case "设置":
        console.log('设置')
        this.props.exitLogin()
        break;
      default:
        break;
    }
  }
  _renderSection(info) {
    return <Text>{""}</Text>;
  }
  _renderItem(info) {
    var image = "";
    var style = {};
    var conunt = ''
    const { recently, isLogin } = this.props;
    console.log('recently')
    console.log(recently)
    switch (info.item.name) {
      case "最近回复":
        image = require("../../resource/images/mine_message.png");
        style = { width: 35, height: 35 };
        conunt = recently.recent_replies.length
        break;
      case "最新发布":
        image = require("../../resource/images/mine_release.png");
        style = { width: 25, height: 25 };
        conunt = recently.recent_topics.length
        break;
      case "话题收藏":
        image = require("../../resource/images/mine_collection.png");
        style = { width: 30, height: 30 };
        break;
      case "设置":
        image = require("../../resource/images/mine_setting.png");
        style = { width: 30, height: 30 };
        break;
      default:
        break;
    }
    return (
      <TouchableHighlight
        underlayColor="#f0f0f0"
        onPress={this._onPressItem.bind(this, info)}
      >
        <View style={styles.itemBack}>
          <View style={styles.itemImageBack}>
            <Image style={style} source={image} />
          </View>
          <View style={styles.itemTextBack}>
            <Text style={styles.itemText}>{info.item.name}</Text>
          </View>
          <View style={styles.itemCountBack}>
            <Text style={styles.itemCount}>
              {info.item.name != "设置" && info.item.name != "话题收藏"
                ? conunt
                : ""}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  _renderListHeader(info) {
    const { user, isLogin } = this.props;
    return (
      <TouchableHighlight
        underlayColor="#f0f0f0"
        onPress={this._onLoginPress.bind(this, info)}
      >
        <View style={styles.headerBack}>
          <View style={styles.headerImageBack}>
            {isLogin ? (
              <Image
                style={styles.headerImage}
                source={{ uri: user.avatar_url }}
              />
            ) : (
                <Image
                  style={styles.headerImage}
                  source={require("../../resource/images/no_login.png")}
                />
              )}
          </View>
          <View style={styles.headerTextBack}>
            <Text style={styles.headerText}>
              {isLogin ? user.loginname : "未登录"}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
  render() {
    var sections = [
      {
        key: "1",
        data: [{ name: "最近回复" }, { name: "最新发布" }, { name: "话题收藏" }]
      },
      {
        key: "2",
        data: [{ name: "设置" }]
      }
    ];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SectionList
          // removeClippedSubviews={false}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
          renderSectionHeader={this._renderSection.bind(this)}
          renderItem={this._renderItem.bind(this)}
          sections={sections}
          ListHeaderComponent={this._renderListHeader.bind(this)} // 头部
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  headerBack: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 80
  },
  headerImageBack: {
    width: 45,
    height: 45,
    marginLeft: 30
  },
  headerImage: {
    width: 45,
    height: 45
  },
  headerTextBack: {
    marginLeft: 25
  },
  headerText: {
    fontSize: 17
  },
  itemBack: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 50
  },
  itemImageBack: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: 'red',
    width: 45,
    height: 45,
    marginLeft: 20
  },
  itemImage: {
    width: 30,
    height: 30
  },
  itemTextBack: {
    marginLeft: 20
  },
  itemText: {
    fontSize: 14
  },
  itemCountBack: {
    position: "absolute",
    right: 20
  },
  itemCount: {
    color: "#aaaaaa"
  }
});

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  const { loginState, userInfo } = state;
  return {
    user: loginState.user,
    isLogin: loginState.isLogin,
    recently: userInfo.recently,
    favorites: userInfo.favorites
  };
};
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    gotoLogin: (body, func) => {
      dispatch(sendLogin(body, func));
    },
    exitLogin: () => {
      dispatch(exitLogin());
    },
    getUserRecently: (query) => {
      dispatch(getUserRecently(query));
    },
    getUserFavorites: (query) => {
      dispatch(getUserFavorites(query))
    }
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Mine);
