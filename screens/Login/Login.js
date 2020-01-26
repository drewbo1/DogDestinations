import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text, Icon } from 'react-native-elements'
import * as firebase from 'firebase'

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }

  handleLogin = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle} h1>Log in</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Input
        leftIcon={<Icon
        name='ios-mail'
        type='ionicon'
        />}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          secureTextEntry
          leftIcon={<Icon
        name='ios-lock'
        type='ionicon'
        />}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button 
        title="Login" 
        onPress={this.handleLogin} 
        buttonStyle={styles.buttonTop}  
        />
        <Button
        type="outline"
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
          buttonStyle={styles.button}
        />
         <Button
          title="Forgot password?"
          type="clear"
          onPress={() => this.props.navigation.push('PasswordReset')}
          buttonStyle={styles.button}
        />
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
  textInput: {
    height: 40,
    marginTop: 8
  },
  button: {
    width: 250,
    height: 40,
    marginTop: 10,
    
  },
  buttonTop: {
    width: 250,
    height: 40,
    marginTop: 30,
    
  }
})