//import liraries
import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Dimensions,
  Image
} from 'react-native';
import { sendLogin } from '../../actions/mine';
import QRCode from './qrcode';
const { width } = Dimensions.get('window')
const defalutInputW = width - 35
const defalutInputH = 30
// create a component
class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const { params } = navigation.state;
    console.log(state.key)
    return {
      headerTitle: '登录',
      headerRight: (
        <View style={{ width: 30, height: 30, marginRight: 10, marginTop: 5 }}>
          <TouchableOpacity
            onPress={() => navigate('QRCode', { navKey: state.key })}
          >
            <Image style={{ width: 26, height: 26 }}
              source={require('../../resource/images/qrcode.png')}
            />
          </TouchableOpacity>
        </View>
      )
    };
  };
  constructor(props) {
    super(props)
    this.state = { text: ' ' }
  }
  componentWillMount() {

  }
  _onPress(text) {
    this.props.gotoLogin({ accesstoken: 'e2028045-5fa8-4a16-b75e-3d5d9b6ee714' }, (success) => {
      if (success) {
        this.props.navigation.goBack()
      }
    })

  }
  render() {
    // const { state, setParams } = this.props.navigation;
    // console.log('state.params.loading')
    // console.log(state.params.loading)
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.logoView}>
          <Image style={styles.logo}
            source={require('../../resource/images/cnode_logo.png')}
            resizeMode='contain' />
        </View>
        <View style={styles.inputView}>
          <TextInput style={styles.input}
            ref={'_textInput'}
            clearButtonMode='while-editing'
            returnKeyType='done'
            placeholder='建议点击右上角扫码登录或者输入accesstoken'
            placeholderTextColor='#ccccce'
            editable={true}
            value={this.props.value}
            underlineColorAndroid="transparent"
            // onSubmitEditing={this._onSubmitSearch.bind(this)}
            onChangeText={(text) => this.setState({ text: text })}
          />
        </View>
        <TouchableOpacity style={styles.loginBtn} onPress={() => { this._onPress(this.state.text) }}>
          <Text style={styles.login}>登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0
  },

  bgImage: {
    flex: 1,
    resizeMode: "stretch"
  },

  logoView: {
    alignItems: 'center',
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: '#2d2d2d',
  },

  logo: {
    width: 200,
  },

  inputView: {
    height: 44,
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
  },

  input: {
    width: defalutInputW,
    height: defalutInputH,
    fontSize: 14,
    paddingLeft: 15,
    paddingRight: 15,
  },

  loginBtn: {
    padding: 15,
    margin: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0079FD',
  },

  login: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
const mapStateToProps = (state, ownProps) => {
  const { mineState } = state
  console.log(mineState)
  return {
    user: mineState.user,
    loading: mineState.loading,
  }
}
export const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps
  return {
    gotoLogin: (body, func) => {
      dispatch(sendLogin(body, func));
    },
    // removeDeatil: () => {
    //   dispatch(removeTopic())
    // }
    // moreTopics: (page) => {
    //   dispatch(updateTopicsByTab(name, { page: page, limit: 20 }));
    // },
  }
}
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Login);
