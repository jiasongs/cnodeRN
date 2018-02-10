//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Separator from "../components/separator";
import TopicType from "../components/topicType";
import { moment } from "../utils/tools";
import index from "react-native-htmlview";
import { connect } from "react-redux";
import { getTopicsByTab, updateTopicsByTab } from "../actions/topic";
import { get } from "../services/request";
import { } from '../utils/global';
class List extends Component {
  constructor(props) {
    super(props);
    this.state = { footer: false };
    this.page = 1;
  }
  componentDidMount() {
    this.props.getTopics();
  }
  _onRefresh() {
    this.setState({ footer: false });
    const { payload, loading } = this.props;
    if (loading) {
      return;
    }
    this.props.getTopics();
    // this.getDataSourceFromApiAsync();
  }
  _onEndReached() {
    const { payload, loading } = this.props;
    console.log(payload);
    if (payload.length === 0) {
      return;
    }
    if (loading) {
      return;
    }
    if (payload.length > 0) {
      console.log("底部");
      this.setState({ footer: true });
      this.page += 1;
      this.props.moreTopics(this.page);
    }
  }
  _renderFooter() {
    if (this.state.footer) {
      const { payload, loading } = this.props;
      return (
        <View style={styles.footer}>
          <ActivityIndicator
            animating={loading}
            // color='red'
            size="small"
            hidesWhenStopped={true}
          />
        </View>
      );
    } else {
      return <View />
    }
  }
  _navToDetail(index) {
    const { payload } = this.props;
    console.log(this.props.navigate)
    this.props.navigate("Detail", { topicId: payload[index].id });
    // console.log(this.text.props.children = 'asdasd')

  }
  _renderItem(info) {
    let item = info.item
    let index = info.index
    return (
      <TouchableHighlight
        underlayColor="#f0f0f0"
        onPress={() => this._navToDetail(index)}
      >
        <View style={styles.listItem}>
          <View style={styles.topicBack}>
            {/* {_renderItemComponent(item)} */}
            <TopicType item={item} />
            <View style={styles.titleBack}>
              <Text ref={t => this.text = t} style={styles.title} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          </View>
          <View style={styles.contentBack}>
            <View style={styles.headBack}>
              <Image
                style={styles.head}
                source={{ uri: item.author.avatar_url }}
              />
            </View>
            <View style={styles.authorBack}>
              <Text style={styles.loginName}>
                {item.author.loginname}
              </Text>
              <Text style={styles.createAt}>
                {moment(item.create_at)
                  .startOf("minute")
                  .fromNow()}
              </Text>
            </View>
            <View style={styles.readCountBack}>
              <Text style={styles.readCount}>
                {`${item.reply_count} / ${item.visit_count}`}
              </Text>
              <Text style={styles.lastReplyAt}>
                {moment(item.last_reply_at).startOf("minute").fromNow()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const { payload, loading } = this.props;
    console.log(loading)
    return (
      <View style={styles.container}>
        <FlatList
          // removeClippedSubviews={false}
          data={payload}
          ref={"_flatlist"}
          keyExtractor={(item, index) => index}
          ListFooterComponent={this._renderFooter.bind(this)}
          ItemSeparatorComponent={Separator}
          refreshing={loading && (this.state.footer === false)}
          onRefresh={this._onRefresh.bind(this)}
          onEndReachedThreshold={0.1}
          onEndReached={this._onEndReached.bind(this)}
          renderItem={this._renderItem.bind(this)}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  listItem: {
    // flexDirection: 'row',
    // height: 100,
    // backgroundColor: 'red',
  },
  topicBack: {
    flexDirection: "row",
    alignItems: "center"
  },
  type: {
    fontSize: FONT_SIZE(11),
    fontWeight: "bold",
    color: "#fff"
  },
  titleBack: {
    marginRight: 30,
  },
  title: {
    fontSize: FONT_SIZE(13),
    marginTop: 10,
    marginLeft: 15,
    marginRight: 30,
    fontWeight: "bold"
  },
  authorBack: {
    flexDirection: "column",
    justifyContent: "space-around", // 水平
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10
  },
  loginName: {
    fontSize: FONT_SIZE(11),
    height: 20
  },
  createAt: {
    fontSize: FONT_SIZE(12)
  },
  contentBack: {
    flexDirection: "row",
    flex: 1
  },
  readCountBack: {
    flexDirection: "column",
    alignItems: "flex-end",
    position: "absolute",
    right: 20,
    marginTop: 10
  },
  readCount: {
    fontSize: FONT_SIZE(11),
    height: 20
  },
  lastReplyAt: {
    fontSize: FONT_SIZE(12)
  },
  headBack: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10
  },
  head: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  footer: {
    flexDirection: "row",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    marginBottom: 5
  }
});
const mapStateToProps = (state, ownProps) => {
  const { getTopics } = state;
  const { name } = ownProps;
  return {
    payload: getTopics[name],
    loading: getTopics.loading[name]
  };
};
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { name } = ownProps;
  return {
    getTopics: () => {
      dispatch(getTopicsByTab(name));
    },
    moreTopics: page => {
      dispatch(updateTopicsByTab(name, { page: page, limit: 20 }));
    }
  };
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(List);
