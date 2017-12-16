//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from 'react-native';
import Separator from '../../components/separator'
import Topic from '../detail/topic'
// create a component
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: [], refreshing: false };
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
        // console.log(responseJson.data)
        this.setState({ dataSource: responseJson.data, refreshing: false })
      })
      .catch((error) => {
        this.setState({ refreshing: false })
        console.error(error);
      });
  }
  _onRefresh() {
    // this.setState({ refreshing: true })
    // this.getDataSourceFromApiAsync();
  }
  _onEndReached() {
    // if (this.state.dataSource.length > 0) {
    //   console.log('底部')
    // }
  }
  componentDidMount() {
    this.getDataSourceFromApiAsync()
  }
  render() {
    var _keyExtractor = (item, index) => item.key;
    var _detail = (item, index) => {
      if (index == 0) {
        return (<Topic data={this.state.dataSource} />)
      } else if (index == 1) {
        return (
          <Text >{this.state.dataSource.reply_count + ' 回复'}</Text>
        )
      } else {
        return (
          <Text>评论</Text>
        )
      }
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={[{ key: 'a' }, { key: 'b' }]}
          keyExtractor={_keyExtractor}
          ItemSeparatorComponent={Separator}
          // refreshing={this.state.refreshing}
          // onRefresh={() => this._onRefresh()}
          //onEndReachedThreshold={0.1}
          //onEndReached={(info) => {
          //  this._onEndReached()
          // }}
          renderItem={({ item, index }) =>
            <View style={styles.listItem}>
              {_detail(item, index)}
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
    // backgroundColor: '#2c3e50',
  },
  listItem: {
    // backgroundColor: 'green'
  },
});

//make this component available to the app
export default Detail;
