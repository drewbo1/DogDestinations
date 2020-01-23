import React from 'react'
import { StyleSheet, View } from 'react-native'
import firebase from 'react-native-firebase'
import { Button, Input, Icon, Text } from 'react-native-elements'
import Orientation from 'react-native-orientation';

export default class SignUp extends React.Component {

  componentDidMount() {
    Orientation.lockToPortrait();
  }
  state = { email: '', password: '', errorMessage: null }

  handleSignUp = () => {
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('Home'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View style={styles.container}>
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