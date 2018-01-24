//import liraries
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import moduleName from '../utils/global';
const { width } = Dimensions.get('window')
const defalutInputW = width - 40 - 20 - 20
const defalutInputH = 27
// create a component
class SearchBar extends Component {
  static propTypes = {
    value: PropTypes.string,
    onSubmitSearch: PropTypes.func,
    onCancelPress: PropTypes.func,
    containerStyle: PropTypes.object,
    InputViewStyle: PropTypes.object,
    leftComponent: PropTypes.func,
    rightComponent: PropTypes.func,
  };
  static defaultProps = {

  };
  constructor(props) {
    super(props);
    this.state = { text: '' }
  }
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.value })
  }
  _renderLeftComponent() {
    if (this.props.leftComponent && this.props.leftComponent()) {
      return this.props.leftComponent
    } else {
      return (
        <Image
          style={styles.searchImage}
          source={require('../resource/images/search.png')}
        />
      )
    }
  }
  _renderRightComponent() {

    if (this.props.rightComponent && this.props.rightComponent()) {
      return this.props.rightComponent
    } else {
      return (
        <TouchableOpacity
          onPress={this._cancelPress.bind(this)}
        >
          <Text style={styles.rightText}>取消</Text>
        </TouchableOpacity>
      )
    }
  }
  _cancelPress() {
    console.log('_cancelPress')
    this.refs['_textInput'].blur()
    const { onCancelPress } = this.props
    onCancelPress();
    this.setState({ text: '' })
  }
  _onSubmitSearch() {
    // console.log(this.props.onSubmitSearch())
    const { onSubmitSearch, name } = this.props
    console.log(onSubmitSearch(this.state.text))
  }
  render() {
    console.log('this.state.text')
    console.log(this.state.text)
    return (
      <View style={styles.containerStyle}>
        <View style={styles.leftViewStyle}>
        </View>
        <View style={styles.inputViewStyle}>
          <View style={styles.searchImageView}>
            <Image
              style={styles.searchImage}
              source={require('../resource/images/search.png')}
            />
          </View>
          <TextInput style={styles.input}
            ref={'_textInput'}
            clearButtonMode='while-editing'
            returnKeyType='search'
            placeholder='搜索文章'
            placeholderTextColor='#ccccce'
            editable={true}
            value={this.state.text}
            underlineColorAndroid="transparent"
            onSubmitEditing={this._onSubmitSearch.bind(this)}
            onChangeText={(text) => this.setState({ text: text })}
          />
        </View>
        <View style={styles.rightViewStyle}>
          {this._renderRightComponent()}
        </View>
      </View>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  containerStyle: {
    width: width - 20,
    height: defalutInputH,
    flexDirection: 'row',
    // backgroundColor: '#fff'
  },
  inputViewStyle: {
    width: defalutInputW,
    height: defalutInputH,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
  },
  input: {
    marginLeft: 2,
    padding: 0,
    fontSize: FONT_SIZE(14),
    width: defalutInputW - 20 - 10,
    height: defalutInputH,
  },
  rightViewStyle: {
    marginLeft: 10,
    width: 40,
    height: defalutInputH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightText: {
    color: '#fff',
    fontSize: FONT_SIZE(16),
  },
  leftViewStyle: {

  },
  searchImageView: {
    width: 20,
    height: defalutInputH,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5
  },
  searchImage: {
    width: 20,
    height: 20
  }
});

//make this component available to the app
export default SearchBar;
