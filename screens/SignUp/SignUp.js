import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import * as firebase from 'firebase'
import { Button, Input, Icon, Text } from 'react-native-elements'
import FormInput from '../../src/components/FormInput/FormInput'


export default class SignUp extends React.Component {

  componentDidMount() {
    
  }
  state = { email: '', password: '',reenterPassword: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password, reenterPassword } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <KeyboardAvoidingView 
      style={styles.container}
      enabled
      behavior="padding">
        <Text style ={styles.mainTitle} h1>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Input
        leftIcon={<Icon
        name='ios-mail'
        type='ionicon'
        />}
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          secureTextEntry
          leftIcon={<Icon
        name='ios-lock'
        type='ionicon'
        />}
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Input
          secureTextEntry
          leftIcon={<Icon
        name='ios-lock'
        type='ionicon'
        />}
          placeholder="Re-enter Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={reenterPassword => this.setState({ reenterPassword })}
          value={this.state.reenterPassword}
        />
        <Button 
        title="Sign Up" 
        onPress={this.handleSignUp} 
        buttonStyle={styles.buttonTop}  
        />
        <Button
        type='outline'
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
          buttonStyle={styles.button}
        />
      </KeyboardAvoidingView>
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
    marginTop: 8,
  },
  button: {
    height: 40,
    width: 250,
    marginTop: 10,
  },
  buttonTop: {
    height: 40,
    width: 250,
    marginTop: 30,
  }
})