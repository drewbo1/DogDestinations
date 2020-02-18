import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import * as firebase from "firebase";

export default class Loading extends React.Component {
  componentDidMount() {
    this.checkStatus();
  }
  
  
checkStatus = () => {
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      var user = firebase.auth().currentUser;

      if(user != null && email_verified){
        var email_verified = user.emailVerified;
        console.log('Is email verified?:' + email_verified);
       this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("EmailValidation")
        console.log('Is email verified?:' + email_verified);
      }
    } else {
      this.props.navigation.navigate("SignUp");
      console.log('No user is signed in');
    }
  });
};

 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainTitle} h2>
          Dog Destinations
        </Text>
        <Text h3>Loading</Text>
        <ActivityIndicator size="large" />
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
  }
});
