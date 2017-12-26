//import liraries
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
  propTypes
} from 'react-native';
import PropTypes from 'prop-types';
import Gallery from 'react-native-image-gallery';
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
    this.state = { visible: false }
  }
  _onOpen() {
    this.setState({ visible: true })
  }
  _onClose() {
    console.log('zzz')
    this.setState({ visible: false })
  }
  render() {
    console.log(this.props.source.uri)
    return (
      <View>
        <TouchableOpacity
          // onLayout={this._onLayout.bind(this)}
          onPress={this._onOpen.bind(this)}
          style={{ marginTop: 10, marginBottom: 10 }} >
          <CustomImage
            uri={this.props.source.uri}
            // style={imgStyle}
            defaultSize={this.props.defaultSize}
            maxImageWidth={this.props.maxImageWidth}
          />
        </TouchableOpacity>
        <Modal
          animationType='fade'
          visible={this.state.visible}
          onRequestClose={this._onClose.bind(this)}
        >
          <Gallery
            style={{ width: width, height: height, backgroundColor: 'black' }}
            images={[{ source: { uri: this.props.source.uri } }]}
            // onOpenImageViewer={this._onOpen.bind(this)}
            onSingleTapConfirmed={this._onClose.bind(this)}
          />
        </Modal>
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
