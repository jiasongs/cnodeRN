//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { moment } from '../utils/tools';
import Separator from './separator';
import PropTypes from 'prop-types';
const { width } = Dimensions.get('window')
// create a component
class MessageList extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    data: PropTypes.array,
  };
  _onPress(info) {
    this.props.navigate('Detail', { topicId: info.item.topic.id, replyId: info.item.reply.id })
  }
  _renderItem(info) {
    var type = ''
    if (info.item.type === 'reply') {
      type = '回复'
    } else if (info.item.type === 'at') {
      type = '@你'
    }
    var replyCreateTime = moment(info.item.reply.create_at).startOf("minute").fromNow()
    return (
      <TouchableHighlight
        underlayColor='#f0f0f0'
        onPress={this._onPress.bind(this, info)}
      >
        <View style={styles.itemContainer}>
          <Image style={styles.head} source={{ uri: info.item.author.avatar_url }} />
          <View style={styles.contentContainer}>
            <Text style={styles.contentInfo}>
              {info.item.author.loginname + ' 在' + replyCreateTime + ' ' + type + ':'}
            </Text>
            <Text style={styles.contentDetail} numberOfLines={1}>
              {info.item.reply.content}
            </Text>
            <View style={styles.contentTitleContainer}>
              <Text style={styles.contentTitlePrefix}>主题 >> </Text>
              <Text style={styles.contentTitle} numberOfLines={1}>{info.item.topic.title}</Text>
            </View>

          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    console.log(this.props.data)
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => index}
          renderItem={this._renderItem.bind(this)}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#fff',
  },
  head: {
    margin: 15,
    width: 40,
    height: 40,
    borderRadius: 40 / 2
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginRight: 20,
  },

  contentInfo: {
    marginTop: 8,
    fontSize: 13,
  },
  contentDetail: {
    marginTop: 5,
    fontSize: 14,
  },
  contentTitleContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 8,
    marginRight: 20
  },
  contentTitlePrefix: {
    color: '#0085da'
  },
  contentTitle: {
    paddingRight: 30,
    fontSize: 13,
    color: '#43454a'
  }
});

//make this component available to the app
export default MessageList;
