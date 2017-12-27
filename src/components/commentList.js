//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert
} from 'react-native';
import Separator from "./separator";
import { moment } from '../utils/tools';
import HTML from 'react-native-render-html';
import ImageViewer from '../components/imageViewer';
const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20
// create a component
class CommentList extends Component {

  _onLinkPress(evt, url) {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('Can\'t handle url: ' + url);
          Alert.alert(
            '提示',
            'Can\'t handle url: ' + url,
            [
              { text: 'OK', onPress: () => { } }
            ]
          );
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => {
        console.log('An error occurred', err);
        Alert.alert(
          '提示',
          'An error occurred: ' + err,
          [
            { text: 'OK', onPress: () => { } }
          ]
        );
      })
  }
  _renderImageViewer(htmlAttribs) {
    if (typeof (htmlAttribs.src) == 'undefined') {
      return null
    }
    return (
      <ImageViewer
        source={{ uri: 'http:' + htmlAttribs.src }}
      />)
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.data}
          keyExtractor={(item, index) => item.id}
          ItemSeparatorComponent={Separator}
          // refreshing={this.state.refreshing}
          // onRefresh={() => this._onRefresh()}
          // onEndReachedThreshold={0.1}
          // onEndReached={(info) => {
          //   this._onEndReached()
          // }}
          renderItem={({ item, index }) =>
            <View style={styles.itemList}>
              <View style={styles.authorInfoBack}>
                <Image
                  style={styles.head}
                  source={{ uri: item.author.avatar_url }}
                />
                <View style={styles.authorBack}>
                  <Text style={styles.author}>{item.author.loginname}</Text>
                  <Text style={styles.createAt}>{moment(item.create_at).startOf('minute').fromNow()}</Text>
                </View>
                <View style={styles.praiseBack}>
                  <View style={styles.praiseCountBack}>
                    <Text style={styles.praiseCount}>456</Text>
                  </View>
                  <View style={styles.praiseImageBack}>
                    <Image
                      style={styles.praiseImage}
                      source={require('../resource/images/praise_normal.png')}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.contentBack}>
                <HTML
                  html={item.content}
                  // selectable={true}
                  // classesStyles={htmlStyles}
                  tagsStyles={htmlStyles}
                  imagesMaxWidth={Dimensions.get('window').width}
                  onLinkPress={this._onLinkPress.bind(this)}
                  renderers={{
                    img: this._renderImageViewer.bind(this)
                  }}
                />
                {/* <Text style={styles.content} numberOfLines={0}>{item.content}</Text> */}
              </View>
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


  },
  authorInfoBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorBack: {
    marginLeft: 10,
    marginTop: 10,
  },
  author: {
    fontSize: 12,
    height: 22,
    color: '#626262'
  },
  createAt: {
    fontSize: 12,
    color: '#626262'
  },
  praiseBack: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
  },
  praiseCountBack: {
    justifyContent: 'center',
  },
  praiseCount: {

  },
  praiseImageBack: {
    justifyContent: 'center',
    // alignItems: 'center',
    marginLeft: 5,
    // marginTop: 12,
  },
  praiseImage: {
    width: 23,
    height: 23,
  },
  head: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginLeft: 10,
    marginTop: 10,
  },
  contentBack: {
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  content: {
    marginBottom: 10
  },
});
const fontSize = 14
const titleMargin = 5
const htmlStyles = {
  // p: { // 解析失败
  //   // lineHeight: fontSize * 1.4,
  //   fontSize: fontSize,
  //   color: 'red'
  // },
  pwrapper: {
    marginTop: 5,
    marginBottom: 5
  },
  a: {
    color: '#3498DB',
    fontSize: fontSize,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 10,
    marginLeft: 10
  },
  h1: {
    fontSize: fontSize * 1.6,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.8)'
  },
  h1wrapper: {
    marginTop: titleMargin,
    marginBottom: titleMargin
  },
  h2: {
    fontSize: fontSize * 1.5,
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.85)'
  },
  h2wrapper: {
    marginBottom: titleMargin,
    marginTop: titleMargin
  },
  h3: {
    fontWeight: 'bold',
    fontSize: fontSize * 1.4,
    color: 'rgba(0,0,0,0.8)'
  },
  h3wrapper: {
    marginBottom: titleMargin - 2,
    marginTop: titleMargin - 2
  },
  h4: {
    fontSize: fontSize * 1.3,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h4wrapper: {
    marginBottom: titleMargin - 2,
    marginTop: titleMargin - 2
  },
  h5: {
    fontSize: fontSize * 1.2,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h5wrapper: {
    marginBottom: titleMargin - 3,
    marginTop: titleMargin - 3
  },
  h6: {
    fontSize: fontSize * 1.1,
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold'
  },
  h6wrapper: {
    marginBottom: titleMargin - 3,
    marginTop: titleMargin - 3
  },
  // li: {
  //   fontSize: fontSize * 0.9,
  //   color: 'rgba(0,0,0,0.7)'
  // }, // 解析失败
  liwrapper: {
    paddingLeft: 20,
    marginBottom: 10
  },
  strong: {
    fontWeight: 'bold'
  },
  em: {
    fontStyle: 'italic'
  },
  codeScrollView: {
    backgroundColor: '#333',
    flexDirection: 'column',
    marginBottom: 15
  },
  codeRow: {
    flex: 1,
    flexDirection: 'row',
    height: 25,
    alignItems: 'center'
  },
  codeFirstRow: {
    paddingTop: 20,
    height: 25 + 20
  },
  codeLastRow: {
    paddingBottom: 20,
    height: 25 + 20
  },
  codeFirstAndLastRow: {
    paddingBottom: 20,
    height: 25 + 40,
    paddingTop: 20
  },
  lineNum: {
    width: 55,
    color: 'rgba(255,255,255,0.5)'
  },
  lineNumWrapper: {
    width: 55,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  codeWrapper: {
    flexDirection: 'column'
  },
  codeLineWrapper: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  blockquotewrapper: {
    paddingLeft: 20,
    borderLeftColor: '#3498DB',
    borderLeftWidth: 3
  },
  img: {
    width: width - 80 - 20,
    height: width - 80 - 20,
    resizeMode: Image.resizeMode.contain,
    margin: 10
  }
};
//make this component available to the app
export default CommentList;
