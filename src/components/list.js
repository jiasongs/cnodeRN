//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
} from 'react-native';
import Separator from '../components/separator'
import TopicType from '../components/topicType'
import { moment } from '../utils/tools';


class list extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], refreshing: true };
  }
  getDataSourceFromApiAsync() {
    console.log(this.props.name)
    var url = 'https://cnodejs.org/api/v1/topics';
    url = url + "?page=" + '1' + "&tab=" + this.props.name;
    fetch(url, {
      method: 'get',
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson.data, refreshing: false })
        // console.log(this.state.dataSource)
      })
      .catch((error) => {
        this.setState({ refreshing: false })
        console.error(error);
      });
  }
  _onRefresh() {
    this.setState({ refreshing: true })
    this.getDataSourceFromApiAsync();
  }
  _onEndReached() {
    if (this.state.dataSource.length > 0) {
      console.log('底部')
    }
  }
  componentDidMount() {
    this.getDataSourceFromApiAsync();
  }
  _navToDetail(index) {
    console.log(this.state.dataSource[index].id)
    this.props.navigate('Detail', { topicId: this.state.dataSource[index].id });
  }
  render() {
    var _keyExtractor = (item, index) => index;
    // var _renderItemComponent = (item) => {
    //   var tab = ''
    //   switch (item.tab) {
    //     case 'share':
    //       tab = '分享';
    //       break;
    //     case 'ask':
    //       tab = '问答';
    //       break;
    //     case 'good':
    //       tab = '精华';
    //       break;
    //     case 'dev':
    //       tab = '测试';
    //       break;
    //     case 'job':
    //       tab = '招聘';
    //       break;
    //     default:
    //       break;
    //   }
    //   if (item.good) {
    //     if (item.top) {
    //       return (<View style={styles.typeBack}><Text style={styles.type}>置顶</Text></View>)
    //     } else {
    //       return (<View style={styles.typeBack}><Text style={styles.type}>精华</Text></View>)
    //     }
    //   } else {
    //     return (<View style={styles.typeBack}><Text style={styles.type}>{tab}</Text></View>)
    //   }
    // }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          keyExtractor={_keyExtractor}
          ItemSeparatorComponent={Separator}
          refreshing={this.state.refreshing}
          onRefresh={() => this._onRefresh()}
          onEndReachedThreshold={0.1}
          onEndReached={(info) => {
            this._onEndReached()
          }}
          renderItem={({ item, index }) =>
            <TouchableHighlight underlayColor='#f0f0f0'
              onPress={() => this._navToDetail(index)}>
              <View style={styles.listItem}>
                <View style={styles.topicBack}>
                  {/* {_renderItemComponent(item)} */}
                  <TopicType item={item} />
                  <View style={styles.titleBack}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  </View>
                </View>
                <View style={styles.contentBack} >
                  <View style={styles.headBack}>
                    <Image style={styles.head} source={{ uri: item.author.avatar_url }} />
                  </View>
                  <View style={styles.authorBack}>
                    <Text style={styles.loginName}>{item.author.loginname}</Text>
                    <Text style={styles.createAt}>{moment(item.create_at).startOf('minute').fromNow()}</Text>
                  </View>
                  <View style={styles.readCountBack}>
                    <Text style={styles.readCount}>{item.reply_count + ' / ' + item.visit_count}</Text>
                    <Text style={styles.lastReplyAt}>{moment(item.last_reply_at).startOf('minute').fromNow()}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          }
        />
      </View>

    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  listItem: {
    // flexDirection: 'row',
    // height: 100,
    // backgroundColor: 'red',
  },
  topicBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBack: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 20,
    backgroundColor: '#f67c3e',
    marginTop: 10,
    marginLeft: 15,
    borderRadius: 3,
  },
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  titleBack: {
    marginRight: 30,
  },
  title: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 30,
    fontWeight: 'bold',
  },
  authorBack: {
    flexDirection: 'column',
    justifyContent: 'space-around', // 水平
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  loginName: {
    fontSize: 12,
    height: 20,
  },
  createAt: {
    fontSize: 13,
  },
  contentBack: {
    flexDirection: 'row',
    flex: 1,
  },
  readCountBack: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    marginTop: 10,
  },
  readCount: {
    fontSize: 12,
    height: 20,
  },
  lastReplyAt: {
    fontSize: 13,
  },
  headBack: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
  },
  head: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
});

//make this component available to the app
export default list;
