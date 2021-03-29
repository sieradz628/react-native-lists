import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'

import MainItem from './MainItem'

const MainItemList = ({ data, activeId, handleClick }) => {
  return (
    <View style={styles.container} >
      <FlatList 
        data={data}
        keyExtractor={data=>data.id}
        renderItem={({ item }) => (
          <MainItem data={item} activeId={activeId} handleClick={handleClick} />
          )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fbf8fc',
    borderColor: '#fbf8fc',
    borderWidth: 1,
    borderRadius: 10,
  },
})

export default MainItemList
