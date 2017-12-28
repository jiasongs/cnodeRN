//import liraries
import React, { Component } from 'react';
import SearchBar from '../../components/searchBar';
import { connect } from 'react-redux';
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
} from 'react-native';
import { getSearchTopics, removeSearchTopics, loading } from '../../actions/find';
const { width, height } = Dimensions.get('window')
// create a component
class Find extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams } = navigation;
    return {
      header: null,
      // headerLeft: (<Image source={req}></Image>),
    };
  }
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }
  _renderHotSearch(info) {
    var hosts = info.item.host
    var index = info.index
    console.log(hosts)
    return (
      <View style={styles.hots}>
        <View style={styles.hotsRow}>
          {
            hosts.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.hotsBtn}
                  onPress={this._hotSearchPress.bind(this, item)}
                >
                  <Text style={styles.hotsText}>{item}</Text>
                </TouchableOpacity>)
            })
          }
        </View>
      </View >)
  }
  _renderSearchResult(info) {
    const { loading } = this.props
    return (
      <View style={styles.searchResultView} key={info.item.id}>
        <TouchableHighlight
          underlayColor='#f0f0f0'
          onPress={this._onPressItem.bind(this, info)}
        >
          <View>
            <Text
              style={styles.searchResultTitle}
              numberOfLines={1}>
              {info.item.title}
            </Text>
            <Text
              numberOfLines={3}
              style={styles.searchResultContent} >
              {info.item.content}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
  _renderSection(info) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.section}>{info.section.key}</Text>
      </View>
    )
  }
  _onPressItem(info) {
    const { payload } = this.props;
    console.log(this.props)
    this.props.navigation.navigate('Detail', { topicId: payload[info.index].id });
  }
  _hotSearchPress(text) {
    if (typeof (text) == 'undefined') {
      return
    }
    this.setState({ text: text })
    var params = { pn: 10, usm: 1, word: 'site%3Acnodejs.org+' + text }
    this.props.getSearchTopics(params)
  }
  _onSubmitSearch(text) {
    if (typeof (text) == 'undefined') {
      return
    }
    var params = { pn: 10, usm: 1, word: 'site%3Acnodejs.org+' + text }
    this.props.getSearchTopics(params)
  }
  _onCancelPress() {
    console.log('z')
    this.setState({ text: '' })
    this.props.removeSearchTopics()
  }
  render() {
    const { navigate } = this.props.navigation
    const { payload, loading } = this.props
    const hosts = ['NodeJs', 'Web', 'ReactJs', 'Vuejs', 'Mysql', 'JavaScript', 'Express', 'ES6']
    var sections = [
      {
        key: "热门搜索",
        data: [{ host: hosts }],
        renderItem: this._renderHotSearch.bind(this)  // (info) => this._renderHotSearch(info)
      },
      {
        key: payload.length > 0 ? '搜索结果' : '',
        data: payload,
        renderItem: this._renderSearchResult.bind(this)//(info) => this._renderSearchResult(info)
      },
    ];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.searchBarView}>
          <SearchBar
            value={this.state.text}
            onCancelPress={this._onCancelPress.bind(this)}
            onSubmitSearch={this._onSubmitSearch.bind(this)}
          />
        </View>
        {
          loading ? <ActivityIndicator
            style={{ top: 200, width: width, position: 'absolute', zIndex: 1000 }}
            animating={loading}
            // color='red'
            size="large"
            hidesWhenStopped={true}
          /> : null
        }
        <SectionList
          keyExtractor={(item, index) => item.id}
          stickySectionHeadersEnabled={false}
          //  ItemSeparatorComponent={Separator}
          renderSectionHeader={this._renderSection.bind(this)}
          sections={sections}
        // renderItem={() => <Text>2323</Text>}
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
    // backgroundColor: '#2c3e50',
  },
  searchBarView: {
    backgroundColor: '#2D2D2D',
    height: height == 815 ? 88 : 64,
    paddingTop: height == 815 ? 37 : 27,
    paddingLeft: 15
  },
  hots: {
    marginLeft: 15,
    marginTop: 5,
  },
  titleView: {
    marginBottom: 15,
  },
  title: {
    color: '#999999',
    fontSize: 12,
  },
  hotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  hotsBtn: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 3,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#3c5e91',
  },
  hotsText: {
    color: '#FFFFFF',
  },
  sectionView: {
    marginLeft: 15,
    height: 40,
    justifyContent: 'center',
  },
  section: {
    color: '#a2a2a2'
  },
  searchResultView: {
    backgroundColor: '#ffffff',
    margin: 8,
    borderRadius: 3,
  },
  searchResultTitle: {
    padding: 10,
    fontSize: 15,
    // color: '#a3a3a3'
  },
  searchResultContent: {
    padding: 10,
    fontSize: 14,
    // color: '#a3a3a3',
    lineHeight: 20,
  }
});
const mapStateToProps = (state, ownProps) => {
  const { getSearchTopics } = state
  return {
    payload: getSearchTopics.data,
    loading: getSearchTopics.loading,
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    getSearchTopics: (param) => {
      dispatch(getSearchTopics(param));
    },
    removeSearchTopics: () => {
      dispatch(removeSearchTopics());
    }
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Find);