//import liraries
import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image
} from 'react-native';
import { getUserInfo } from "../../actions/user";
import * as types from '../../constants/actionTypes';
import Separator from "../../components/separator";
// create a component
class UserInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = state;
    return {
      headerTitle: '个人资料',
    };
  };
  componentWillMount() {
    const { state, setParams, navigate } = this.props.navigation;
    const { params } = state;
    console.log(params.userName)
    this.props.getUserInfo(params.userName)
  }
  _renderItem(info) {
    console.log(info.item)
    var name = ''
    var value = ''
    for (const key in info.item) {
      if (info.item.hasOwnProperty(key)) {
        name = key
        value = info.item[key];
      }
    }
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName} selectable={true}>{name}</Text>
        {
          info.index == 0 ? (
            <View style={styles.itemHeaderView}>
              <Image style={styles.itemHeader} source={{ uri: value }} />
            </View>)
            :
            <View style={styles.itemValueView}>
              <Text style={styles.itemValue} numberOfLines={0} selectable={true}>{value}</Text>
            </View>
        }
      </View>
    )
  }
  render() {
    // const { state, setParams, navigate,userInfo } = this.props.navigation;
    // const { params } = state;
    // console.log(params)
    const { userInfo } = this.props
    const data = [
      { 头像: userInfo.avatar_url },
      { 昵称: userInfo.name },
      { 微博: userInfo.weibo },
      { 个人网站: userInfo.home },
      { 所在地点: userInfo.location },
      { 个性签名: userInfo.signature }
    ]
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={() => <Text></Text>}
          renderItem={this._renderItem.bind(this)}
        />
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
    backgroundColor: '#f8f8f8',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  itemName: {
    paddingLeft: 25,
    paddingTop: 30,
    paddingBottom: 30,
    fontSize: 16,
  },
  itemValueView: {
    marginRight: 20,
  },
  itemValue: {
    paddingLeft: 15,
    fontSize: 14,
    color: '#a8a8a8',
    lineHeight: 15,
    // textAlign: 'right',
  },
  itemHeaderView: {
    marginRight: 20,
  },
  itemHeader: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  }
});

const mapStateToProps = (state, ownProps) => {
  const { userInfo } = state;
  return {
    userInfo: userInfo.userInfo,
  };
};
export const mapDispatchToProps = (dispatch, ownProps) => {
  // const { loginName } = ownProps
  return {
    getUserInfo: (query) => {
      dispatch(getUserInfo(query));
    },
    // removeDeatil: () => {
    //   dispatch(removeTopic())
    // }
    // moreTopics: (page) => {
    //   dispatch(updateTopicsByTab(name, { page: page, limit: 20 }));
    // },
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);