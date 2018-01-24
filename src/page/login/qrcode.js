import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Camera from 'react-native-camera';
import FONT_SIZE from '../../utils/fontSize';
import { sendLogin } from '../../actions/login';
import { getUserRecently, getUserFavorites } from "../../actions/user";
const { height, width } = Dimensions.get('window')
const cameraSize = 250
const borderColor = 'rgba(255,255,255,0.6)'
const borderBoxSize = 35

class QRCode extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    console.log(params)
    return {
      headerTitle: '扫码',
      headerRight: <View />,
      // headerRight: (<TouchableOpacity onPress={() => navigation.goBack(params.navKey)} ><Text>234234</Text></TouchableOpacity>)
    };
  };
  constructor(props) {
    super(props);
    this.state = { first: true }
  }

  render() {
    return (
      <Camera
        ref={(cam) => {
          this.camera = cam;
        }}
        onBarCodeRead={this.onBarCodeRead.bind(this)}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}
      // barcodeFinderVisible={true}
      // barcodeFinderWidth={220}
      // barcodeFinderHeight={220}
      // barcodeFinderBorderColor="red"
      // barcodeFinderBorderWidth={2}
      >
        {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text> */}
      </Camera>
    );
  }
  onBarCodeRead(e) {
    if (!this.state.first) {
      return
    }
    if (this.props.loading) {
      return
    }
    console.log(
      "Barcode Found!",
      "Type: " + e.type + "\nData: " + e.data
    );
    const { state, setParams, navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    console.log(e.data)
    this.camera.stopCapture()
    if (e.data) {
      this.props.gotoLogin({ accesstoken: e.data }, (sucess, data) => {
        console.log(sucess)
        if (sucess) {
          this.setState({ first: false })
          this.props.getUserRecently(data.loginname)
          this.props.getUserFavorites(data.loginname)
          this.props.navigation.goBack(params.navKey)
        } else {
          this.camera.capture({})
        }
      })
    }

    // const { navigate } = 
    // console.log(navigate)
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
    fontSize: FONT_SIZE(24)
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
const mapStateToProps = (state, ownProps) => {
  const { loginState } = state
  console.log(loginState)
  return {
    user: loginState.user,
    loading: loginState.loading,
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    gotoLogin: (body, func) => {
      dispatch(sendLogin(body, func));
    },
    getUserRecently: (query) => {
      dispatch(getUserRecently(query));
    },
    getUserFavorites: (query) => {
      dispatch(getUserFavorites(query))
    }
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(QRCode)