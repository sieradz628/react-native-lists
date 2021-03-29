import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Spinner = ({ size, color }) => {
  const { spinnerStyle } = styles
  return (
    <View style={spinnerStyle} >
      <ActivityIndicator size={size || 'large'}  color={color || '#0000ff'} />
    </View>
  )
}

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
}

export { Spinner }
