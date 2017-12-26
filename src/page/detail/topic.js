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
} from 'react-native';
import HTML from 'react-native-render-html';
import HTMLView from "react-native-htmlview";
import { moment } from '../../utils/tools';
import TopicType from '../../components/topicType'
import CustomImage from "../../components/customImage";
const { width } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20

// create a component
class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: {} }
  }
  componentDidMount() {

  }
  _renderNode(node) {
    if (node.name == 'img') {
      var src = 'http:' + node.attribs.src
      console.log(src)
      return
      <TouchableOpacity
        onPress={() => alert('点击了图片')}
      >
        <Image
          resizeMode='contain'
          style={{ width: defaultMaxImageWidth, height: 100, }}
          source={{ uri: 'http:' + node.attribs.src }}
        />
      </TouchableOpacity>
    }
  }
  render() {
    var author = this.props.data.author;
    if (typeof (author) == "undefined") {
      author = { avatar_url: ' ', loginname: ' ' }
    } else {
      console.log(author.avatar_url)
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
            onLinkPress={(url) => console.log(url)}
            renderers={{
              img: (htmlAttribs) =>
                <TouchableOpacity
                  onPress={() => alert('点击了图片')}
                  style={{ marginTop: 10, marginBottom: 10 }}
                >
                  <CustomImage
                    uri={'http:' + htmlAttribs.src}
                    // style={imgStyle}
                    defaultSize={{
                      height: 300,
                      width: defaultMaxImageWidth
                    }}
                    maxImageWidth={defaultMaxImageWidth}
                  />
                  {/* <Image
                    resizeMode='contain'
                    style={{ width: defaultMaxImageWidth, height: 100, }}
                    source={{ uri: 'http:' + htmlAttribs.src }}
                  /> */}
                </TouchableOpacity>
            }}
          />
          {/* <HTMLView
            value={content}
            onLinkPress={(url) => console.log('navigating to: ', url)}
            stylesheet={htmlStyles}
            nodeComponentProps={{ selectable: true }}
            renderNode={(node) => this._renderNode(node)}
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
    fontSize: 18,
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
    fontSize: 12,
    height: 20,
  },
  createAt: {
    fontSize: 13,
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
    fontSize: 12,
  },
  contentBack: {
    margin: 15,
  },
  content: {
    fontSize: 17,
    lineHeight: 40,
  },
});
const fontSize = 14
const titleMargin = 5
const htmlStyles = {
  p: { // 解析失败
    // lineHeight: fontSize * 1.4,
    // fontSize: 14,
    // color: 'red'
  },
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
export default Topic;
