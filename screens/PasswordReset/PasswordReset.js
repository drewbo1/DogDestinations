import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Input, Icon } from "react-native-elements";
import firebase from "react-native-firebase";

export default class PasswordReset extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    email: ""
  };

  handleForgotPassword = () => {
    const { email } = this.state
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        alert("Please check your email...");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle} h2>
          Reset Password
        </Text>
        <Text>Enter your email below to reset your password</Text>
        <Input
          style={styles.textInput}
          leftIcon={<Icon name="ios-mail" type="ionicon" />}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button
          title="Reset Password"
          onPress={this.handleForgotPassword}
          buttonStyle={styles.buttonTop}
        />
        <Button
          title="Return to Log-in screen"
          type="outline"
          onPress={() => this.props.navigation.navigate("Login")}
          buttonStyle={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  mainTitle: {
    paddingBottom: 50
  },
  textInput: {
    height: 40,
    marginTop: 8
  },
  buttonTop: {
    width: 250,
    height: 40,
    marginTop: 30
  },
  button: {
    width: 250,
    height: 40,
    marginTop: 10
  }
});
