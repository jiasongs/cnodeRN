//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { moment } from '../../utils/tools';
import TopicType from '../../components/topicType'
// create a component
class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: {} }
  }
  componentDidMount() {

  }
  render() {
    var author = this.props.data.author;
    if (typeof (author) == "undefined") {
      author = { avatar_url: ' ', loginname: ' ' }
    }
    var _renderItemComponent = () => {
      var tab = ''
      switch (this.props.data.tab) {
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
      if (this.props.data.good) {
        if (this.props.data.top) {
          return (<View style={styles.typeBack}><Text style={styles.type}>置顶</Text></View>)
        } else {
          return (<View style={styles.typeBack}><Text style={styles.type}>精华</Text></View>)
        }
      } else {
        return (<View style={styles.typeBack}><Text style={styles.type}>{tab}</Text></View>)
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.titleBack}>
          <Text style={styles.title}>{this.props.data.title}</Text>
        </View>
        <View style={styles.topicInfoBack}>
          <View style={styles.headBack}>
            <Image style={styles.head}
              source={{ uri: author.avatar_url }}
            />
          </View>
          <View style={styles.authorBack}>
            <Text style={styles.author}>{author.loginname}</Text>
            <Text style={styles.createAt}>{moment(this.props.data.create_at).startOf('minute').fromNow()}</Text>
          </View>
          <View style={styles.otherBack}>
            <TopicType item={this.props.data} />
            <Text style={styles.browserCount}>{this.props.data.visit_count + '次浏览'}</Text>
          </View>
        </View>
        <View style={styles.contentBack}>
          <Text style={styles.content}>{this.props.data.content}</Text>
        </View>
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
    // backgroundColor: '#2c3e50',
  },
  titleBack: {
    padding: 5,
    margin: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    color: '#2c3e50',
    fontSize: 18,
    lineHeight: 1.5 * 18,
    fontWeight: 'bold',
  },
  topicInfoBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headBack: {
    marginLeft: 15,
    // backgroundColor: 'red',
  },
  head: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  authorBack: {
    flexDirection: 'column',
    justifyContent: 'space-around', // 水平
    marginLeft: 15,
  },
  author: {
    fontSize: 12,
    height: 20,
  },
  createAt: {
    fontSize: 13,
  },
  otherBack: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    top: -15,
    height: 50,
  },
  browserCount: {
    marginTop: 5,
  },
  contentBack: {
    margin: 10,
  },
});

//make this component available to the app
export default Topic;
