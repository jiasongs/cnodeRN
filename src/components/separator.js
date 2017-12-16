import React, { Component } from 'react'
import { View } from 'react-native'

export class Separator extends Component {
  render() {
    return (
      <View style={{ height: 1, backgroundColor: '#f0f0f0' }}></View>
    )
  }
}

export default Separator