import React from 'react'
import { View, Text, TextInput } from 'react-native'

const Input = ({ label, placeholder, value, onChangeText, autoCorrect, secureTextEntry }) => {
  const { contentStyle, labelStyle, inputStyle } = styles

  return (
    <View style={contentStyle} >
      <Text style={labelStyle} >{label}</Text>
      <TextInput 
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
      />
    </View>
  )
}

const styles = {
  contentStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#000',
    shadowColor: '#ddd',
    shadowOffser: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize:18,
    paddingLeft: 10,
    flex: 1,
  },
  inputStyle: {
    color: '#000',
    fontSize: 18,
    lineHeight: 23,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 3
  }
}

export { Input }
