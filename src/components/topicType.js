//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';


// create a component
class TopicType extends Component {

  _renderItemComponent = (item) => {
    var tab = ''
    switch (item.tab) {
      case 'share':
        tab = '分享';
        break;
      case 'ask':
        tab = '问答';
        break;
      case 'good':
        tab = '精华';
        break;
      case 'dev':
        tab = '测试';
        break;
      case 'job':
        tab = '招聘';
        break;
      default:
        break;
    }
    if (item.good) {
      if (item.top) {
        return (<Text style={styles.type}>置顶</Text>)
      } else {
        return (<Text style={styles.type}>精华</Text>)
      }
    } else {
      return (<Text style={styles.type}>{tab}</Text>)
    }
  }
  render() {
    var back = {}
    // console.log(this.props.item.tab)
    if (this.props.item.tab == 'share') {
      back = {
        backgroundColor: 'red',
      }
    } else {
      back = {
        backgroundColor: 'blue',
      }
    }
    return (
      <View style={[styles.container, back]}>
        {this._renderItemComponent(this.props.item)}
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 20,
    marginTop: 10,
    marginLeft: 15,
    borderRadius: 3,
  },
  back: {
    backgroundColor: '#f67c3e',
  },
  share: {
    backgroundColor: 'red',
  },
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
});

//make this component available to the app
export default TopicType;
