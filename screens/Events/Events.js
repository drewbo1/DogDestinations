import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



export default class Events extends React.Component {

    static navigationOptions = {
        title: 'Events',
        };
 render() {
    
    return (
        <View style={styles.container}>
      <Text style={styles.text}>This screen will show a list of events.</Text>
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