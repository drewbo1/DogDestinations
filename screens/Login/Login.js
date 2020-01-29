import React from "react";
import { StyleSheet, View, KeyboardAvoidingView, SafeAreaView } from "react-native";
import { Button, Input, Text, Icon } from "react-native-elements";
import * as firebase from "firebase";
import { Formik } from "formik";
import FormInput from "../../src/components/FormInput/FormInput";
import FormButton from "../../src/components/FormButton/FormButton";

export default class Login extends React.Component {
  state = { email: "", password: "", errorMessage: null };

  handleLogin = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate("Home"))
      .catch(error => this.setState({ errorMessage: error.message }));
  };

  render() {
    const { email, password } = this.state;

    return (
        
        
        
      <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <SafeAreaView>
        <View>
        <Text style={styles.mainTitle} h1>
          Log in
        </Text>
        {this.state.errorMessage && (
          <Text style={{ color: "red" }}>{this.state.errorMessage}</Text>
        )}
        </View>
        <FormInput
          name="email"
          value={email}
          placeholder="Enter email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          iconName="ios-mail"
          iconColor="#2C384A"
        />
        <FormInput
          name="password"
          value={password}
          placeholder="Enter password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          iconName="ios-lock"
          iconColor="#2C384A"
        />
        <FormButton
          onPress={this.handleLogin}
          title="LOGIN"
          buttonColor="#039BE5"
        />
        <Button
          type="outline"
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
          buttonStyle={styles.button}
        />
        <Button
          title="Forgot password?"
          type="clear"
          onPress={() => this.props.navigation.push("PasswordReset")}
          buttonStyle={styles.button}
        />
        </SafeAreaView>
      </KeyboardAvoidingView>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainTitle: {
    paddingBottom: 50,
    width: '100%'
    },
  textInput: {
    height: 40,
    marginTop: 8
  },
  button: {
    width: 250,
    height: 40,
    marginTop: 10
  },
  
});
