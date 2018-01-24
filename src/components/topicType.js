//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FONT_SIZE from '../utils/fontSize';

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
    if (item.top) {
      return (<Text style={styles.type}>置顶</Text>)
    } else {
      if (item.good) {
        return (<Text style={styles.type}>精华</Text>)
      } else {
        return (<Text style={styles.type}>{tab}</Text>)
      }
    }
  }
  back(item) {
    var backgroundColor = {}
    if (item.top) {
      return backgroundColor = {
        backgroundColor: '#f94344',
      }
    } else {
      if (item.good) {
        return backgroundColor = {
          backgroundColor: '#f67d3e',
        }
      } else {
        if (this.props.item.tab == 'share') {
          return backgroundColor = {
            backgroundColor: '#00bd9d',
          }
        } else if (this.props.item.tab == 'job') {
          return backgroundColor = {
            backgroundColor: '#ab96c5',
          }
        } else if (this.props.item.tab == 'ask') {
          return backgroundColor = {
            backgroundColor: '#009bd7',
          }
        } else if (this.props.item.tab == 'dev') {
          return backgroundColor = {
            backgroundColor: '#798aa2',
          }
        }
      }
    }
  }
  // console.log(this.props.item.tab)
  render() {
    return (
      <View style={[styles.container, this.back(this.props.item)]}>
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
    fontSize: FONT_SIZE(11),
    fontWeight: 'bold',
    color: '#fff',
  },
});

//make this component available to the app
export default TopicType;
