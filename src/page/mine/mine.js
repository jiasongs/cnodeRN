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
import { Separator } from "../../components/separator";
import { sendLogin } from "../../actions/mine";
// create a component
class Mine extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    console.log(state.key);
    return {};
  };
  _renderSection(info) {
    return <Text>{""}</Text>;
  }
  _renderItem(info) {
    var image = "";
    var style = {};
    switch (info.item.name) {
      case "最近回复":
        image = require("../../resource/images/mine_message.png");
        style = { width: 35, height: 35 };
        break;
      case "最新发布":
        image = require("../../resource/images/mine_release.png");
        style = { width: 25, height: 25 };
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
        onPress={this._onPressItem.bind(this)}
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
                ? 0
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
  _onLoginPress(info) {
    const { user, isLogin } = this.props;
    if (isLogin) {
      this.props.navigation.navigate("UserInfo");
    } else {
      this.props.navigation.navigate("Login");
    }
  }
  _onPressItem() {
    alert("待开发");
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
  const { mineState } = state;
  return {
    user: mineState.user,
    isLogin: mineState.isLogin
  };
};
//make this component available to the app
export default connect(mapStateToProps)(Mine);
