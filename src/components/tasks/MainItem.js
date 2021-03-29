import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

const MainItem = ({ data, activeId, handleClick, deleteItem }) => {
  return (
    <View>
      <TouchableOpacity style={data.id === activeId ? styles.activeItem : styles.button} onPress={() => handleClick(data.id)} >
        <Image style={styles.image} source={{ uri: data.url }} />
        <Text style={styles.title} >{data.title}</Text>
        <Text onPress={() => deleteItem(data.id, data.title)} style={styles.deleteItem} >X</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  activeItem: {
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#fff',
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 10,
    margin: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: 93,
    height: 75,
    borderRadius: 9 ,
    overflow: 'hidden',
    marginRight: 10,
  },
  title: {
    textAlign: 'left',
    width: 275,
  },
  deleteItem: {
    position: 'absolute',
    right: 0, 
    top: 0,
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 3,
  }
})

export default MainItem 
