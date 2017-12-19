//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  SectionList,
  TouchableHighlight,
} from 'react-native';
import { Separator } from "../../components/separator";
// create a component
class Notice extends Component {
  static navigationOptions = ({ navigation }) => {
    return {

    };
  }
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true
    }
  }
  _onPressItem() {
    alert('待开发')
  }
  _renderContactItem(info) {
    if (typeof (info.item.name) == 'undefined') {
      return (
        <View style={styles.noContactMessageBack}>
          <Text style={styles.noContactMessage}>暂无消息</Text>
        </View>
      )
    }
    return (
      <Text style={styles.contactMessageBack}>123
      </Text>
    )
  }
  _renderSysItem(info) {
    return (
      <TouchableHighlight
        underlayColor='#f0f0f0'
        onPress={this._onPressItem.bind(this)}
      >
        <View style={styles.sysBack}>
          <View style={styles.sysImageBack}>
            <Image
              style={styles.sysImage} // (info.item.name == '系统消息') ? require('../../resource/images/system_message.png') : require('../../resource/images/system_no.png')
              source={info.item.name == '系统消息' ? require('../../resource/images/message.png') : require('../../resource/images/notif.png')}
            />
          </View>
          <Text style={styles.sys}>{info.item.name}</Text>
        </View>
      </TouchableHighlight>
    )
  }
  _renderSection(info) {
    return (
      <View style={styles.sectionBack}>
        <Text style={styles.section}>{info.section.key}</Text>
      </View>)
  }
  render() {
    var sections = [
      {
        key: "系统",
        data: [{ name: "系统消息" }, { name: "好友申请" }],
        renderItem: (info) => this._renderSysItem(info)
      },
      {
        key: "联系人",
        data: [{}],
        renderItem: (info) => this._renderContactItem(info)
      },
    ];
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SectionList
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={Separator}
          renderSectionHeader={this._renderSection.bind(this)}
          // renderItem={this._renderItem.bind(this)}
          sections={sections}
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
  sectionBack: {
    justifyContent: 'center',
    height: 30,
    marginLeft: 15,
  },
  section: {
    // color: '#88aea3'
  },
  sysBack: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
  },
  sysImageBack: {
    marginLeft: 20
  },
  sysImage: {
    width: 26,
    height: 26,
  },
  sys: {
    marginLeft: 10
  },
  noContactMessageBack: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 50,
  },
  noContactMessage: {
    color: '#a4a4a4'
  },
});

//make this component available to the app
export default Notice;
