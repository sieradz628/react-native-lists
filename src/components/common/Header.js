import React from 'react'
import { View, Text } from 'react-native'

const Header = ({ headerText }) => {
  const { viewStyle, textStyle } = styles
  
  return (
    <View style={viewStyle} >
      <Text style={textStyle} > {headerText} </Text>
    </View>
  )
}

const styles = {
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
  }
}

export { Header }
