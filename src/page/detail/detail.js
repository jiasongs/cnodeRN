//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import Separator from '../../components/separator'
import Topic from '../detail/topic'
import CommentList from '../../components/commentList';
// create a component
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: {}, refreshing: true };
  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const { params } = navigation.state;
    return {
      headerTitle: '话题',
    };
  };
  getDataSourceFromApiAsync() {
    const { params } = this.props.navigation.state;
    let url = 'https://cnodejs.org/api/v1/topic/' + params.topicId // mdrender
    // url = url + "?page=" + '1' + "&tab=" + this.props.name;
    // url = url + '?mdrender=false'
    fetch(url, {
      method: 'get',
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson.data, refreshing: false })
        console.log(responseJson.data)
      })
      .catch((error) => {
        this.setState({ refreshing: false })
        console.error(error);
      });
  }
  _onRefresh() {
    this.setState({ refreshing: false })
    // this.setState({ refreshing: true })
    // this.getDataSourceFromApiAsync();
  }
  _onEndReached() {
    // if (this.state.dataSource.length > 0) {
    //   console.log('底部')
    // }
  }
  componentDidMount() {
    this.setState({ refreshing: true })
    this.getDataSourceFromApiAsync()
  }
  _detail(index) {
    if (index == 0) {
      var topic = this.state.dataSource.id ? (<Topic data={this.state.dataSource} />) : null
      return topic
    } else if (index == 1) {
      var replay = this.state.dataSource.id ? <View style={styles.replyCountBack}><Text style={styles.replyCount}>{this.state.dataSource.reply_count + ' 回复'}</Text></View> : null
      return replay
    } else {
      var comment = this.state.dataSource.id ? <CommentList data={this.state.dataSource.replies} /> : null
      return comment
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ key: '详情' }, { key: '回复数' }, { key: '评论' }]}
          keyExtractor={(item, index) => item.key}
          ItemSeparatorComponent={this.state.dataSource.id ? Separator : null}
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh.bind(this)}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.refreshing}
          //     onRefresh={this._onRefresh.bind(this)}
          //     tintColor="#ff0000"
          //     title="Loading..."
          //     titleColor="#00ff00"
          //     colors={['#ff0000', '#00ff00', '#0000ff']}
          //     progressBackgroundColor="#ffff00"
          //   />
          // }
          //onEndReachedThreshold={0.1}
          //onEndReached={(info) => {
          //  this._onEndReached()
          // }}
          renderItem={({ item, index }) =>
            <View style={styles.listItem}>
              {this._detail(index)}
            </View>
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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#fff',
  },
  listItem: {
    // backgroundColor: 'green'
  },
  replyCountBack: {
    justifyContent: 'center',
    marginLeft: 15,
    height: 40,
  },
  replyCount: {
    fontSize: 15,
  }
});

//make this component available to the app
export default Detail;
