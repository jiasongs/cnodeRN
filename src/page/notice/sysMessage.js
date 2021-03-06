
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import MessageList from '../../components/messageList';
import { getMessage } from '../../actions/message';

class ReadMessage extends Component {
  render() {
    const { navigate, readMessage, unreadMessage } = this.props.screenProps;
    console.log('readMessage')
    console.log(readMessage)
    return (
      <View style={styles.container}>
        <MessageList navigate={navigate} data={readMessage} />
      </View>
    );
  }
}
class UnreadMessage extends Component {
  render() {
    const { navigate, readMessage, unreadMessage } = this.props.screenProps;
    return (
      <View style={styles.container}>
        <MessageList navigate={navigate} data={unreadMessage} />
      </View>
    );
  }
}
const TabNavs = TabNavigator({
  UnreadMessage: {
    screen: UnreadMessage,
    navigationOptions: {
      tabBarLabel: '未读消息'
    }
  },
  ReadMessage: {
    screen: ReadMessage,
    navigationOptions: {  // 也可以写在组件的static navigationOptions内
      tabBarLabel: '已读消息'
    }
  },
}, {
    tabBarOptions: {
      showIcon: false,
      activeTintColor: '#0085da',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        backgroundColor: '#0085da',
        height: 2
      },
      labelStyle: {
        fontSize: FONT_SIZE(13),
        textAlignVertical: 'center',
        textAlign: 'center'
      },
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

// create a component
class SysMessage extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    let z = ''
    if (typeof (navigation.state.params) != 'undefined') {
      console.log(navigation.state.params)
      if (Object.keys(navigation.state.params).length > 0) {
        if (navigation.state.params.hasOwnProperty('header')) {
          z = navigation.state.params.header
        }
      }
    }
    return {
      headerTitle: z === '' ? '23' : z,
      // headerRight: <View />,
      headerRight: <Text onPress={() => navigation.state.params.navigatePress()}>测试</Text>,
    };
  }
  onPress = () => {
    console.log('1')
    this.props.navigation.setParams({ header: 'header' })
    // this.props.navigation.goBack()
    console.log(this.props.navigation.state.params)
  }
  componentDidMount() {
    this.props.navigation.setParams({ navigatePress: this.onPress })
  }
  componentWillMount() {
    this.props.getMessage({ 'accesstoken': 'e2028045-5fa8-4a16-b75e-3d5d9b6ee714', 'mdrender': false })
  }
  render() {
    const { navigate } = this.props.navigation
    const { readMessage, unreadMessage } = this.props
    return (
      <View style={styles.container}>
        <TabNavs screenProps={{ navigate, readMessage, unreadMessage }} />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
const mapStateToProps = (state, ownProps) => {
  const { messageState } = state
  console.log(messageState)
  return {
    readMessage: messageState.readMessage,
    unreadMessage: messageState.unreadMessage
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMessage: (parms) => {
      dispatch(getMessage(parms))
    }
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(SysMessage);;

