import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import * as firebase from 'firebase'


export default class Loading extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'Home' : 'SignUp')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle} h2>Dog Destinations</Text>
        <Text h3>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  mainTitle: {
    paddingBottom: 50,
  },
})