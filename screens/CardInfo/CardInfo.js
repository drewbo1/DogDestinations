import React from 'react';
import { StyleSheet, View, Text } from 'react-native';



export default class CardInfo extends React.Component {

    static navigationOptions = {
        title: 'Card info',
        };
 render() {
    
    return (
        <View style={styles.container}>
      <Text style={styles.text}>This screen will give the information for the card that you have pressed.</Text>
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