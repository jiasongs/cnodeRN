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
  FlatList
} from 'react-native';
import { getSearchTopics } from '../../actions/find';
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
    return (<View style={styles.hots}>
      <View style={styles.hotsRow}>
        {
          hosts.map((item, index) => {
            return (<TouchableOpacity key={index} style={styles.hotsBtn} onPress={() => console.log('z')}>
              <Text style={styles.hotsText}>{item}</Text>
            </TouchableOpacity>)
          })
        }
      </View>
    </View >)
  }
  _renderSearchResult(info) {
    return (
      <View key={info.item.id} style={{ width: 375, height: 200 }}>
        <Text style={{ width: 50, height: 100 }}>{info.item.title}</Text>
      </View>

      // <View>
      //   <FlatList
      //     data={info.item}
      //     keyExtractor={(item, index) => item.id}
      //     renderItem={(item, index) => {
      //       <View style={{ width: 375, height: 200 }}>
      //         <Text style={{ width: 50, height: 100 }}>{'/asdasdasd'}</Text>
      //       </View>

      //     }}
      //   />
      // </View>
    )
  }
  _renderSection(info) {
    return (
      <View style={styles.sectionView}>
        <Text style={styles.section}>{info.section.key}</Text>
      </View>
    )
  }
  render() {
    const { navigate } = this.props.navigation
    const { payload } = this.props
    console.log(payload)
    const hosts = ['NodeJs', 'Web', 'ReactJs', 'Vuejs', 'Mysql', 'JavaScript', 'Express', 'ES6']
    var sections = [
      {
        key: "热门搜索",
        data: [{ host: hosts }],
        renderItem: (info) => this._renderHotSearch(info)
      },
      {
        key: "无人回复的话题",
        data: payload,
        renderItem: (info) => this._renderSearchResult(info)
      },
    ];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.searchBarView}>
          <SearchBar
            onSubmitSearch={(text) => {
              if (typeof (text) == 'undefined') {
                return
              }
              var params = { pn: 10, usm: 1, word: 'site%3Acnodejs.org+' + text }
              this.props.getSearchTopics(params)
              // dispatch(find.getSearchTopics(params))
            }}
          />
        </View>
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
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Find);
