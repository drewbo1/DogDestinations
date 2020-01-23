import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



export default class Profile extends React.Component {

    static navigationOptions = {
        title: 'Profile',
        };
 render() {
    
    return (
        <View style={styles.container}>
      <Text style={styles.text}>This screen will contain information from the users profile.</Text>
      <Text style={styles.text}>It will be where the user can change information about their profile</Text>
      <Text style={styles.text}>This functionality is not completed for this prototype.</Text>
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
  }
});