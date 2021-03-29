import React, { useState } from 'react'
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native'
import { Header, Button } from '../components/common'

import firebase from '../utils/firebase'

const AddItem = ({ navigation }) => {
  const [item, setItem] = useState({ url:'', title:'' })

  const createItem = () => {
    if (!item.url && !item.title) 
      return Alert.alert( 'Please enter at least url or title', null, [
          { text: 'Ok' }
        ]) 
    if (item.url && !item.url.match(/https?:[^)''"]+\.(?:jpg|jpeg|gif|png)(?![a-z/])/g))
      return Alert.alert( 'Please provide image url with .jpg, .jpeg, .gif or .png', null, [
        { text: 'Ok' }
      ])
    const itemRef = firebase.database().ref('lists')
    itemRef.push(item)
    setItem({ url:'', title:'' })
    navigation.navigate('Home')
  }

  const handleOnChange = (e, name) => {
    const itemTemp = { ...item };
    Object.keys(itemTemp).map((key) => {
      if (key === name){
        itemTemp[key] = e;
      }
    })
    setItem(itemTemp)
  }

  return (
    <View style={styles.container} >
    <Header headerText='Add Item' />
      <View style={styles.addItem} >
        <Text>Image url:</Text>
        <TextInput placeholder='https://picsum.photos/250/120'
          style={styles.input} 
          onChangeText={text => handleOnChange(text, 'url')}
          value={item.url} 
        />
        <Text>Title</Text>
        <TextInput placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit'
          style={styles.input} 
          onChangeText={text => handleOnChange(text, 'title')}
          value={item.title}
        />
        <Button onPress={createItem} >Add Item</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  addItem: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    height: 30,
    width: '97%',
    padding: 3,
    marginBottom: 10,
    fontSize: 16
  }
})

export default AddItem
