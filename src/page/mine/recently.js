//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableHighlight
} from 'react-native';
import { moment } from "../../utils/tools";
import Separator from "../../components/separator";
const { width } = Dimensions.get('window')
// create a component
class Recently extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    console.log(state.key);
    return {
      headerTitle: params.type,
      headerRight: <View />,
      // headerLeft: null
    };
  };
  componentWillMount() {

  }
  _onPress(info) {
    console.log(info.item)
    this.props.navigation.navigate("Detail", { topicId: info.item.id });
  }
  _renderItem(info) {
    console.log(info.item)
    return (
      <TouchableHighlight
        onPress={this._onPress.bind(this, info)}
      >
        <View style={styles.itemContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.itemTitle} numberOfLines={1}>{info.item.title}</Text>
            <View style={styles.itemTimeView}>
              <Text style={styles.itemTime}>{moment(info.item.last_reply_at).startOf("minute").fromNow()}</Text>
            </View>
          </View>
          <View style={styles.itemHeaderView}>
            <Image style={styles.itemHeader} source={{ uri: info.item.author.avatar_url }} />
            <Text style={styles.itemHeaderName}>{info.item.author.loginname}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    const { state } = this.props.navigation;
    const { params } = state;
    console.log(params.recently)
    return (
      <View style={styles.container}>
        <FlatList
          data={params.recently}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
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
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  contentContainer: {
    margin: 15,
  },
  itemTitle: {
    width: width - 30 - 60,
    fontSize: FONT_SIZE(14),
    fontWeight: "bold",
  },
  itemHeaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  itemTimeView: {
    marginTop: 10,
    width: 75,
    height: 22,
    borderRadius: 3,
    backgroundColor: '#308edc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTime: {
    color: '#fff',
    fontSize: FONT_SIZE(12),
  },
  itemHeader: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  itemHeaderName: {
    paddingTop: 5,
  },
});
export default Recently;

