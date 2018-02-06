//import liraries
import React, { Component } from "react";
import SearchBar from "../../components/searchBar";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  SectionList,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableHighlight,
  Platform,
  ScrollView
} from "react-native";
import {
  getSearchTopics,
  removeSearchTopics,
  loading
} from "../../actions/find";
const { width, height } = Dimensions.get("window");
// create a component
class Find extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      header: null,
      tabBarLabel: '发现',
      tabBarIcon: ({ focused, tintColor }) => {
        return <Image
          resizeMode="contain"
          style={{ height: 28, width: 28 }}
          source={
            !focused
              ? require("../../resource/images/find_normal.png")
              : require("../../resource/images/find_selected.png")
          }
        />
      }
      // headerLeft: (<Image source={req}></Image>),
    };
  };
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }
  _renderHotSearch(info) {
    var hosts = info.item.host;
    var index = info.index;
    console.log(hosts);
    return (
      <View style={styles.hotsRow}>
        <TouchableOpacity
          key={index}
          style={styles.hotsBtn}
          onPress={this._hotSearchPress.bind(this, info.item)}
        >
          <Text style={styles.hotsText}>{info.item}</Text>
        </TouchableOpacity>
        {/* {hosts.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={styles.hotsBtn}
            onPress={this._hotSearchPress.bind(this, item)}
          >
            <Text style={styles.hotsText}>{item}</Text>
          </TouchableOpacity>
        );
      })} */}
      </View>
    );
  }
  _renderSearchResult(info) {
    const { loading } = this.props;
    console.log(info)
    return (
      <TouchableHighlight
        underlayColor="#f0f0f0"
        onPress={this._onPressItem.bind(this, info)} >
        <View style={styles.searchResultView} key={info.item.id}>
          <Text style={styles.searchResultTitle} numberOfLines={0}>
            {info.item.title}
          </Text>
          <Text numberOfLines={3} style={styles.searchResultContent}>
            {info.item.content}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
  _renderSection(info) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.section}>{info.section.key}</Text>
      </View>
    );
  }
  _onPressItem(info) {
    const { payload } = this.props;
    console.log(this.props);
    this.props.navigation.navigate("Detail", {
      topicId: payload[info.index].id
    });
  }
  _hotSearchPress(text) {
    if (typeof text == "undefined") {
      return;
    }
    this.setState(() => {
      return { text: text }
    });
    var params = { pn: 10, usm: 1, word: "site%3Acnodejs.org+" + text };
    this.props.getSearchTopics(params);

  }
  _onSubmitSearch(text) {
    if (typeof text == "undefined") {
      return;
    }
    var params = { pn: 10, usm: 1, word: "site%3Acnodejs.org+" + text };
    this.props.getSearchTopics(params);
  }
  _onCancelPress() {
    console.log("z");
    this.setState({ text: "" });
    this.props.removeSearchTopics();
  }
  componentWillReceiveProps(nextProps) {

  }
  _rederHeader() {
    return (<View style={styles.headerContainer}
      ref={view => this.headerView = view}
    >
      <View style={styles.headerView}

      >
        <Text>我是Header</Text>
      </View>

    </View>)
  }

  _onScroll(info) {
    let critical = 88
    let contentOffsetY = info.nativeEvent.contentOffset.y
    console.log(info.nativeEvent.contentOffset)
    // if (contentOffsetY > 0 && contentOffsetY <= critical) {
    //   let alpha = contentOffsetY / critical > 1.0 ? 0.0 : 1 - contentOffsetY / critical;
    //   this.searchBarView.setNativeProps({ style: { opacity: alpha, marginTop: -contentOffsetY, top: 0, position: 'relative' } })
    // } else if (contentOffsetY === 0) {
    //   this.searchBarView.setNativeProps({ style: { opacity: 1, marginTop: 0 } })
    // } else if (contentOffsetY < 0) {
    //   this.headerView.setNativeProps({ style: { position: 'relative', transform: [{ translateY: contentOffsetY - 10 }] } })
    // } else if (contentOffsetY > critical) {
    //   this.headerView.setNativeProps({ style: { transform: [{ translateY: contentOffsetY }], zIndex: 999 } })
    // }
  }
  render() {
    const { navigate } = this.props.navigation;
    const { payload, loading } = this.props;
    const hosts = [
      "Node.Js",
      "Web",
      "React.Js",
      "Vue.js",
      "Mysql",
      "JavaScript",
      "Express",
      // "ES6"
    ];
    var sections = [
      {
        key: "热门搜索",
        data: hosts,
        renderItem: this._renderHotSearch.bind(this)
      },
      {
        key: payload.length > 0 ? "搜索结果" : "",
        data: payload,
        renderItem: this._renderSearchResult.bind(this)
      }
    ];
    console.log('sections')
    console.log(sections)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.searchBarView}
          ref={view => this.searchBarView = view}
        >
          <SearchBar
            value={this.state.text}
            onCancelPress={this._onCancelPress.bind(this)}
            onSubmitSearch={this._onSubmitSearch.bind(this)}
          />
        </View>
        {/* <ScrollView
          stickyHeaderIndices={[0]}
        >
          {this._rederHeader()}
          
  
        </ScrollView> */}
        <SectionList
          ref={sectionList => this.sectionList = sectionList}
          contentContainerStyle={styles.contentContainerStyle}
          // removeClippedSubviews={false}
          keyExtractor={(item, index) => index}
          stickySectionHeadersEnabled={false}
          //  ItemSeparatorComponent={Separator}
          renderSectionHeader={this._renderSection.bind(this)}
          sections={sections}
          onScroll={this._onScroll.bind(this)}
        // scrollEventThrottle={20}
        />
        {loading && <ActivityIndicator
          style={{
            top: 200,
            width: width,
            height: 30,
            position: "absolute",
          }}
          animating={loading}
          // color='red'
          size="large"
          hidesWhenStopped={true}
        />}
      </View>
    );
  }
}
const searchBarHeight = 64
if (Platform.OS == 'ios') {
  searchBarHeight = (height == 815 ? 88 : 64)
} else {
  searchBarHeight = 54
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 100,
    width: 375,
    zIndex: 999
  },
  headerView: {
    flex: 1,
    width: 375,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c5e91',
    marginTop: 0,
    zIndex: 999
  },
  searchBarView: {
    backgroundColor: "#2D2D2D",
    height: searchBarHeight,
    paddingTop: Platform.OS == 'android' ? 0 : (height == 815 ? 37 : 27),
    paddingLeft: 15,
    justifyContent: Platform.OS == 'android' ? 'center' : 'flex-start',
    // opacity: 0.5,
  },
  titleView: {
    marginBottom: 15
  },
  title: {
    color: "#999999",
    fontSize: FONT_SIZE(12)
  },
  contentContainerStyle: {
    flexDirection: 'row',//设置横向布局
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'blue'
  },
  hotsRow: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // paddingRight: 15,
    // backgroundColor: 'red',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  hotsBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 3,
    backgroundColor: "#3c5e91"
  },
  hotsText: {
    color: "#FFFFFF",
    fontSize: FONT_SIZE(12)
  },
  sectionView: {
    width: width,
    marginLeft: 15,
    height: 40,
    justifyContent: "center"
  },
  section: {
    color: "#a2a2a2"
  },
  searchResultView: {
    backgroundColor: "#ffffff",
    margin: 8,
    width: width - 16,
    borderRadius: 3
  },
  searchResultTitle: {
    padding: 10,
    fontSize: FONT_SIZE(13)
    // color: '#a3a3a3'
  },
  searchResultContent: {
    padding: 10,
    fontSize: FONT_SIZE(12),
    // color: '#a3a3a3',
    lineHeight: 20
  }
});
const mapStateToProps = (state, ownProps) => {
  const { getSearchTopics } = state;
  return {
    payload: getSearchTopics.data,
    loading: getSearchTopics.loading
  };
};
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;
  return {
    getSearchTopics: param => {
      dispatch(getSearchTopics(param));
    },
    removeSearchTopics: () => {
      dispatch(removeSearchTopics());
    }
  };
};
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Find);
