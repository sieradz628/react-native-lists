import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles
  
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle} >
      <Text style={textStyle} >
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'green',
    marginTop: 20,
    marginRight: 5,
    marginLeft: 5,
  },
  textStyle: {
    alignSelf: 'center',
    color:'green',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
}

export { Button }
