//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  propTypes,
  NativeModules,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
// import Gallery from 'react-native-image-gallery';
import { Overlay, AlbumView } from 'teaset';
import CustomImage from "./customImage";

const { width, height } = Dimensions.get('window')
const defaultMaxImageWidth = width - 30 - 20
// create a component
class ImageViewer extends Component {
  static propTypes = {
    source: PropTypes.object.isRequired,
    defaultSize: PropTypes.object,
    maxImageWidth: PropTypes.number
  };
  static defaultProps = {
    defaultSize: {
      height: 300,
      width: defaultMaxImageWidth
    },
    maxImageWidth: defaultMaxImageWidth
  };
  constructor(props) {
    super(props);
  }
  _show(e) {
    console.log(e)
    NativeModules.UIManager.measure(e.target, (x, y, width, height, pageX, pageY) => {
      // pageY是组件在当前屏幕上的绝对位置
      console.log(pageX, pageY, height);
      let overlayView = (
        <Overlay.PopView
          containerStyle={{ flex: 1 }}
          overlayOpacity={1}
          type='custom'
          customBounds={{ x: pageX, y: pageY, width, height }}
          ref={v => this.fullImageView = v}
        >
          <AlbumView
            style={{ flex: 1 }}
            control={false}
            images={[{ uri: this.props.source.uri }]}
            defaultIndex={0}
            onPress={() => this.fullImageView && this.fullImageView.close()}
          />
        </Overlay.PopView>
      );
      Overlay.show(overlayView);
    });
  }

  render() {
    console.log(this.props.source.uri)
    return (
      <View>
        <TouchableOpacity
          onPress={this._show.bind(this)}
          style={{ marginTop: 10, marginBottom: 10 }} >
          <CustomImage
            ref={view => this.imgView = view}
            uri={this.props.source.uri}
            defaultSize={this.props.defaultSize}
            maxImageWidth={this.props.maxImageWidth}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default ImageViewer;
