//import liraries
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import Separator from '../../components/separator'
import DetailList from '../../components/detailList'
import CommentList from '../../components/commentList';
import { getTopicById, removeTopic } from '../../actions/detial';
// create a component
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: {}, refreshing: false };
  }
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    const { params } = navigation.state;
    return {
      headerTitle: '话题',
    };
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    this.props.getDetail(params.topicId)
  }
  componentWillUnmount() {
    // 移除数据
    this.props.removeDeatil()
  }
  _onRefresh() {
    const { params } = this.props.navigation.state;
    this.props.getDetail(params.topicId)
  }
  _onEndReached() {

  }
  _detail(index) {
    const { payload, loading } = this.props
    if (index == 0) {
      var topic = payload.id ? (<DetailList data={payload} />) : null
      return topic
    } else if (index == 1) {
      var replay = payload.id ? <View style={styles.replyCountBack}><Text style={styles.replyCount}>{payload.reply_count + ' 回复'}</Text></View> : null
      return replay
    } else {
      var comment = payload.id ? <CommentList data={payload.replies} /> : null
      return comment
    }
  }
  render() {
    const { payload, loading } = this.props
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ key: '详情' }, { key: '回复数' }, { key: '评论' }]}
          keyExtractor={(item, index) => item.key}
          ItemSeparatorComponent={payload.id ? Separator : null}
          refreshing={loading}
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

const mapStateToProps = (state, ownProps) => {
  const { getDetail } = state
  return {
    payload: getDetail.data,
    loading: getDetail.loading,

  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    getDetail: (topicId) => {
      dispatch(getTopicById(topicId));
    },
    removeDeatil: () => {
      dispatch(removeTopic())
    }
    // moreTopics: (page) => {
    //   dispatch(updateTopicsByTab(name, { page: page, limit: 20 }));
    // },
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
