import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TabNavigator, TabBarTop } from 'react-navigation';
import TopicsList from '../../components/topicsList';
import * as types from '../../constants/actionTypes'
import { sendLogin, exitLogin } from "../../actions/login";
import { getUserRecently, getUserFavorites } from "../../actions/user";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  iconBtn: {
    width: 25,
    height: 25,
  },
  // tabActive: {
  //   borderBottomWidth: 1.5,
  //   borderColor: '#4181DE',
  //   height: 40,
  // },
});
// create a component
class All extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <TopicsList name='all' navigate={navigate} />
      </View>
    );
  }
}
class Essence extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <TopicsList name='good' navigate={navigate} />
      </View>
    );
  }
}
class Share extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <TopicsList name='share' navigate={navigate} />
      </View>
    );
  }
}
class Ask extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <TopicsList name='ask' navigate={navigate} />
      </View>
    );
  }
}
class Job extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <TopicsList name='job' navigate={navigate} />
      </View>
    );
  }
}

const TabNavs = TabNavigator({
  All: {
    screen: All,
    navigationOptions: {  // 也可以写在组件的static navigationOptions内
      tabBarLabel: '全部'
    }
  },
  Essence: {
    screen: Essence,
    navigationOptions: {
      tabBarLabel: '精华'
    }
  },
  Share: {
    screen: Share,
    navigationOptions: {
      tabBarLabel: '分享'
    }
  },
  Ask: {
    screen: Ask,
    navigationOptions: {
      tabBarLabel: '问答'
    }
  },
  Job: {
    screen: Job,
    navigationOptions: {
      tabBarLabel: '招聘'
    }
  },
}, {
    tabBarOptions: {
      activeTintColor: '#0085da',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: '#0085da',
        height: 1.5
      },
      labelStyle: {
        fontSize: 14,
        textAlignVertical: 'center',
        textAlign: 'center'
      },
      showIcon: false,
      style: {
        backgroundColor: '#fff',
        height: 40,
      },
      tabStyle: {
        height: 40
      },
    },
    lazy: true,
    swipeEnabled: true,
    animationEnabled: false,
    tabBarPosition: 'Top',
    tabBarComponent: TabBarTop,
  });

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const { params } = navigation.state;
    return {
      headerTitle: '话题',
      headerRight: <Text onPress={() => navigation.navigate('ToastExample')}>测试</Text>
    };
  };
  componentWillMount() {
    global.storage.load({
      key: types.LOGIN_STATE,
      autoSync: true,
      syncInBackground: true,
    }).then(ret => {
      console.log('ret');
      console.log(ret);
      if (ret.token.length > 0) {
        this.props.gotoLogin({ accesstoken: ret.token }, (success, data) => {
          if (success) {
            this.props.getUserRecently(data.loginname)
            this.props.getUserFavorites(data.loginname)
          }
        })
      }
    }).catch(err => {
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    })
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TabNavs screenProps={{ navigate }} />
      </View>
    );
  }
}
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);
