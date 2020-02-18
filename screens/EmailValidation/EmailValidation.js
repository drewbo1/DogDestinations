import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';



export default class EmailValidation extends React.Component {

    
 render() {
    
    return (
        <View style={styles.container}>
        <Text h1>Thank you</Text>
      <Text style={styles.text}>Thank you for registering, please check your email to complete the process.</Text>
      <Button
            type="outline"
            title="Have an account? Login"
            onPress={() => this.props.navigation.navigate("Login")}
            buttonStyle={styles.button}
          />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
  button: {
    height: 40,
    width: 250,
    marginTop: 10
  },
});