//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  WebView,
  TouchableOpacity,
  NativeModules,
  Linking,
  Alert
} from 'react-native';
import HTML from 'react-native-render-html';
import HTMLView from "react-native-htmlview";
import { moment } from '../utils/tools';
import TopicType from './topicType'
import ImageViewer from './imageViewer';
// import { } from '../utils/global';
const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20

// create a component
class DetailList extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: {}, }
  }
  componentDidMount() {

  }
  _onLayout(e) { // 相对于父元素
    console.log(e.nativeEvent)
  }
  _onImagePress(e) {
    console.log(e.target)
    NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
      this.currentPosY = pageY;
      // pageY是组件在当前屏幕上的绝对位置
      console.log(x, y);
      console.log(pageX, pageY);
    });
    this.refs._touchableOpacity.measure((x, y, width, height, pageX, pageY) => {
      console.log(x, y, width, pageX, pageY, height);
    })
  }
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
  _renderImageView(htmlAttribs) {
    if (typeof (htmlAttribs.src) == 'undefined') {
      return null
    }
    console.log(htmlAttribs)
    return (
      <ImageViewer
        source={{ uri: 'http:' + htmlAttribs.src }}
      />)
  }
  _renderPView(htmlAttribs, children, convertedCSSStyles, passProps) {
    console.log('htmlAttribs')
    console.log(htmlAttribs)
    console.log(children)
    return (
      <Text>234</Text>
    )
  }
  _renderNode(node, index, siblings, parent, defaultRenderer) {
    console.log(node)
    if (node.name == 'img') {

      console.log('node.attribs')
      console.log(node.attribs)
      return (
        <ImageViewer
          source={{ uri: 'http:' + node.attribs.src }}
        />)
    } else if (node.name == 'p') {
      console.log(node.attribs)
    }
  }

  render() {
    var author = this.props.data.author;
    if (typeof (author) == "undefined") {
      author = { avatar_url: ' ', loginname: ' ' }
    } else {
      // console.log(author.avatar_url)
    }
    var content = this.props.data.content;
    if (typeof (content) == "undefined") {
      content = '<div></div>'
    } else {

    }
    return (
      <View style={styles.container}>
        <View style={styles.titleBack}>
          <Text style={styles.title}>{this.props.data.title}</Text>
        </View>
        <View style={styles.topicInfoBack}>
          <View style={styles.headBack}>
            <Image style={styles.head}
              source={{ uri: author.avatar_url }}
            />
          </View>
          <View style={styles.authorBack}>
            <Text style={styles.author}>{author.loginname}</Text>
            <Text style={styles.createAt}>{moment(this.props.data.create_at).startOf('minute').fromNow()}</Text>
          </View>
          <View style={styles.otherBack}>
            <TopicType item={this.props.data} />
            <Text style={styles.browserCount}>{this.props.data.visit_count + '次浏览'}</Text>
          </View>
        </View>
        <View style={styles.contentBack}>
          <HTML
            html={content}
            // selectable={true}
            tagsStyles={htmlStyles}
            // classesStyles={htmlStyles}
            imagesMaxWidth={Dimensions.get('window').width}
            onLinkPress={this._onLinkPress.bind(this)}
            renderers={{
              img: this._renderImageView.bind(this),
            }}
          />
          {/* <HTMLView
            value={content}
            style={{ width: 375, height: 200 }}
            onLinkPress={(url) => console.log('navigating to: ', url)}
            // stylesheet={htmlStyles}
            nodeComponentProps={{ selectable: true }}
            renderNode={this._renderNode.bind(this)}
          /> */}

          {/* <WebView
            ref={'webview'}
            // style={{ height: 100 }}
            source={{ html: content }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            mixedContentMode='always'
          /> */}
        </View>
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
  titleBack: {
    padding: 5,
    margin: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  title: {
    color: '#2c3e50',
    fontSize: FONT_SIZE(16),
    lineHeight: 1.5 * 18,
    fontWeight: 'bold',
  },
  topicInfoBack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headBack: {
    marginLeft: 15,
    // backgroundColor: 'red',
  },
  head: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2
  },
  authorBack: {
    flexDirection: 'column',
    justifyContent: 'space-around', // 水平
    marginLeft: 15,
  },
  author: {
    fontSize: FONT_SIZE(11),
    height: 20,
  },
  createAt: {
    fontSize: FONT_SIZE(12),
  },
  otherBack: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 20,
    top: -10,
    height: 50,
  },
  browserCount: {
    marginTop: 5,
    fontSize: FONT_SIZE(11),
  },
  contentBack: {
    margin: 15,
  },
  content: {
    fontSize: FONT_SIZE(16),
    lineHeight: 40,
  },
});
const fontSize = FONT_SIZE(13)
const titleMargin = 5
const htmlStyles = {
  // p: { // 解析失败
  //   lineHeight: fontSize * 1.4,
  //   fontSize: 14,
  //   marginBottom: 10,
  //   // color: 'red'
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
    marginTop: 10,
    marginBottom: 10,
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
    color: 'rgba(0,0,0,0.8)',
    marginBottom: 10,
    marginTop: 10
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
  ul: {
    paddingTop: 20
  },
  li: {
    // fontSize: fontSize * 0.9,
    // lineHeight: 25,
    // // paddingTop: 5,
    // paddingBottom: 5
  }, // 解析失败
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
export default DetailList;
