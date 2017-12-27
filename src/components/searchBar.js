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
const { width } = Dimensions.get('window')
const defalutInputW = width - 40 - 20 - 20
const defalutInputH = 27
// create a component
class SearchBar extends Component {
  static propTypes = {
    onSubmitSearch: PropTypes.func,
    containerStyle: PropTypes.object,
    InputViewStyle: PropTypes.object,
    leftComponent: PropTypes.func,
    rightComponent: PropTypes.func,
  };
  static defaultProps = {

  };
  constructor(props) {
    super(props);
    this.state = { text: '123' }
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
          onPress={this._searchPress.bind(this)}
        >
          <Text style={styles.rightText}>取消</Text>
        </TouchableOpacity>
      )
    }
  }
  _searchPress() {
    console.log('_onSubmitEditing')
    this.refs['_textInput'].blur()
  }
  _onSubmitSearch() {
    // console.log(this.props.onSubmitSearch())
    const { onSubmitSearch, name } = this.props
    console.log(onSubmitSearch(this.state.text))
  }
  render() {
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
    fontSize: 14,
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
    fontSize: 16,
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
