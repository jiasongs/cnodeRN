import React, { Component } from 'react'
import { View } from 'react-native'

class Separator extends Component {
  render() {
    return (
      <View style={{ height: 2 / PixelRatio, backgroundColor: '#f0f0f0' }}></View>
    )
  }
}

export default Separator