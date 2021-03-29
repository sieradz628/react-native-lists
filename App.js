import React, { useState, useEffect } from 'react'

import firebase from './src/utils/firebase'

import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { Spinner } from './src/components/common'
import Dashboard from './src/screens/Dashboard'
import AddItem from './src/screens/AddItem'
import Login from './src/screens/Login'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(null)
  const [login, setLogin] = useState(null)
  
  const Drawer = createDrawerNavigator()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      user ? setLoggedIn(true) : setLoggedIn(false)
      user ? setLogin(user.email.substring(0, user.email.indexOf('@')).replace(/[^\w\s]/gi, '')) : setLogin(null)
    })
  }, [])


  const renderContent = () => {
    switch (loggedIn) {
      case true:
        return (
          <NavigationContainer>
            <Drawer.Navigator 
              drawerContentOptions = {{
                activeTintColor: 'green',
                itemStyle: { marginVertical: 10 },
              }} >
              <Drawer.Screen name='Home' component={Dashboard} />
              <Drawer.Screen name='Add Item' component={AddItem} />
              <Drawer.Screen name='Log Out' component={Login} />
            </Drawer.Navigator>
          </NavigationContainer>
        )
      case false:
        return <Login />
      default:
        return <Spinner size='large' color='#0000ff' />
    }
  }

  return renderContent()
}

export default App
