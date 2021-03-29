import React, { useState, useEffect } from 'react'

import firebase from '../utils/firebase'

import { View, Text, FlatList, Image, Alert, TextInput, StyleSheet } from 'react-native'
import { Header } from '../components/common'

import MainItem from '../components/tasks/MainItem'

const Dashboard = () => {
  const [data, setData] = useState([])
  const [activeId, setActiveID] = useState(-1)
  const [match, setMatch] = useState('')

  const dataRef = firebase.database().ref('lists')
  
  useEffect(() => {  
    dataRef.on('value', (snapshot) => {
      const data = snapshot.val()
      const dataList = []
      for (let id in snapshot.val()) {
        dataList.push({ id, ... data[id] })
      } 
      setData(dataList)
    })
  }, [])

  const handleClick = (itemId) => {
    setActiveID(itemId)
  }

  const deleteItem = (id, title) => {
    Alert.alert(
      'you want to delete it?',
      title,
      [
        { text: 'Cancel' },
        { text: 'DELETE', onPress: () => dataRef.child(id).remove() }
      ]
    )
  }

  const filtering = data.filter(el => Object.keys(el).find( key => typeof(el[key]) === 'string') ? 
    el['title'].toLowerCase().indexOf(match.toLowerCase()) !== -1 
  : null)

  return (
    <View style={styles.container} >
      <Header headerText='Dashboard'/>
      <Image style={styles.image} source={require('../assets/DeSmart-logo-black-150px.png')} />
      <Text>Please select one item:</Text>
      <View style={styles.serch} >
        <TextInput style={styles.inputSerch} 
          placeholder='please use lower keys' 
          onChangeText={text => setMatch(text)} 
          value={match}
        />
        <Text style={styles.deleteMatch} onPress={() => setMatch('')} >X</Text>
      </View>
      <FlatList 
        style={styles.itemList}
        data={filtering}
        keyExtractor={data=>data.id}
        renderItem={({item}) => (
          <MainItem data={item} activeId={activeId} handleClick={handleClick} deleteItem={deleteItem} />
          )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    margin: 20,
    width: 150,
  },
  itemList: {
    backgroundColor: '#fbf8fc',
    borderColor: '#fbf8fc',
    borderWidth: 1,
    borderRadius: 10,
  },
  serch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  inputSerch: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    height: 30,
    width: 200,
    marginRight: 15,
    padding: 3,
    fontSize: 16
  },
  deleteMatch: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
  }
})

export default Dashboard
