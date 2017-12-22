import React, { Component } from 'react';
import { connect } from 'react-redux'
import { TabNavigator, TabBarTop } from 'react-navigation';
import List from '../../components/list';
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
  static navigationOptions = ({ navigation, screenProps }) => ({

  });
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <List name='all' navigate={navigate} />
      </View>
    );
  }
}
class Essence extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <List name='good' navigate={navigate} />
      </View>
    );
  }
}
class Share extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <List name='share' navigate={navigate} />
      </View>
    );
  }
}
class Ask extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <List name='ask' navigate={navigate} />
      </View>
    );
  }
}
class Test extends Component {
  render() {
    const { navigate } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <List name='dev' navigate={navigate} />
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
  Test: {
    screen: Test,
    navigationOptions: {
      title: '测试'
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
  componentDidMount() {

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

export default Home;
