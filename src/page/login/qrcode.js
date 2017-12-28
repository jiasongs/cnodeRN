import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
const { height, width } = Dimensions.get('window')
const cameraSize = 250
const borderColor = 'rgba(255,255,255,0.6)'
const borderBoxSize = 35
class BadInstagramCloneApp extends Component {
  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        onBarCodeRead={this.onBarCodeRead.bind(this)}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
        barcodeFinderVisible={true}
        barcodeFinderWidth={220}
        barcodeFinderHeight={220}
        barcodeFinderBorderColor="red"
        barcodeFinderBorderWidth={2}
      >
        {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text> */}
      </Camera>
    );
  }

  onBarCodeRead(e) {
    console.log(
      "Barcode Found!",
      "Type: " + e.type + "\nData: " + e.data
    );
  }
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({ metadata: options })
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    height: 350
  },
  preview: {
    width: width,
    height: height,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  cameraView: {
    height: cameraSize,
    width: cameraSize
  },
  container: {
    height: 350
  },
  borderBox: {
    position: 'absolute',
    borderWidth: 2,
    height: borderBoxSize,
    width: borderBoxSize
  },
  borderLeftTop: {
    borderColor: 'transparent',
    borderLeftColor: borderColor,
    borderTopColor: borderColor,
    left: 0,
    top: 0
  },
  borderRightTop: {
    borderColor: 'transparent',
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    right: 0,
    top: 0
  },
  borderLeftBottom: {
    borderColor: 'transparent',
    borderLeftColor: borderColor,
    borderBottomColor: borderColor,
    left: 0,
    bottom: 0
  },
  borderRightBottom: {
    borderColor: 'transparent',
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    right: 0,
    bottom: 0
  },
  infoText: {
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 24
  },
  iconWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45
  },
});

export default BadInstagramCloneApp