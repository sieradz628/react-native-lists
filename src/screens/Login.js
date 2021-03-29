import React, { useState, useEffect } from 'react'
import { View, Alert, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Header, Input, Button } from '../components/common'

import firebase from '../utils/firebase'

const Login = () => {
  const [user, setUser] = useState({ login: null, password: null, repeatPassword: null })
  const [loginToogle, setLoginToogle] = useState(true)

  useEffect(() => {
    firebase.auth().signOut()
  })

  const handleOnChange = (e, name) => {
    const userTemp = { ...user }
    Object.keys(userTemp).map((key) => {
      if (key === name){
        userTemp[key] = e
      }
    })
    setUser(userTemp)
  }

  const logIn = () => {
    if (user.login || user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.login, user.password)
        .catch(err => {
          switch(err.code) {
            case 'auth/invalid-email',
            'auth/user-disabled',
            'auth/user-not-found',
            'auth/wrong-password':
              Alert.alert( 'Please enter a valid login and password', null, [
                { text: 'Ok' }
              ])
              break
            default:
              Alert.alert( 'Please enter a valid login and password', null, [
                { text: 'Ok' }
              ])
              break
          }
        })
    } else {
      Alert.alert( 'Please enter a valid login and password', null, [
        { text: 'Ok' }
      ])
    }
  }

  const signIn = () => {
    if (user.login || user.password || user.repeatPassword) {
      if (user.password === user.repeatPassword) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.login, user.password)
        .catch(err => {
          switch(err.code) {
            case 'auth/invalid-email',
            'auth/user-disabled',
            'auth/user-not-found',
            'auth/wrong-password':
              Alert.alert( 'Please enter a valid login and password', null, [
                { text: 'Ok' }
              ])
              break
            case 'auth/email-already-in-use':
              Alert.alert( `Email address ${user.login} already in use.`, null, [
                { text: 'Ok' }
              ])
            break
            default:
              Alert.alert( 'Please enter a valid login and password', null, [
                { text: 'Ok' }
              ])
              break
          }
        })
      } else {
        Alert.alert( 'Password and repeated password do not match', null, [
          { text: 'Ok' }
        ])
      }
    } else {
      Alert.alert( 'Please enter a valid login and password', null, [
        { text: 'Ok' }
      ])
    }
  }

  return (
    <View style={styles.container} >
      <Header headerText='Log in' />
      <Image style={styles.image} source={require('../assets/DeSmart-logo-black-150px.png')} />
      <Input 
        label='Email'
        placeholder='example@example.com'
        autoCorrect={false}
        value={user.login}
        onChangeText={text => handleOnChange(text.replace(/\s/g, ''), 'login')}
      />
      <Input 
        label='Password'
        placeholder='password'
        secureTextEntry
        value={user.password}
        onChangeText={text => handleOnChange(text, 'password')}
      />
      {loginToogle ?
        null
      : <Input 
          label='Repeat Password'
          placeholder='password'
          secureTextEntry
          value={user.repeatPassword}
          onChangeText={text => handleOnChange(text, 'repeatPassword')}
        />
      }
      <Button onPress={loginToogle ? logIn : signIn} >{loginToogle ? 'Log in' : 'Register'}</Button>
      <TouchableOpacity onPress={() => setLoginToogle(!loginToogle)} >
        <Text style={styles.registerButton} >{loginToogle ? 'Register' : 'Log in'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    margin: 20,
    width: 150,
  },
  registerButton: {
    fontSize: 16,
    color: 'green',
    paddingTop: 30,
    paddingLeft: '75%'
  }
})

export default Login
