import React from 'react';
import { StyleSheet, View, Text , ScrollView } from 'react-native';



export default class Alerts extends React.Component {

    static navigationOptions = {
        title: 'Info',
        };
 render() {
    
    return (
      <ScrollView>
        <View style={styles.container}>
         <Text style={styles.heading}>Add a location</Text>
      <Text style={styles.subHeading}>Touch the plus sign in the top right corner of a page to add a location.</Text>
      <Text style={styles.text}>This will take you to the add page</Text>
      <Text style={styles.text}>Complete the fields and then press the button to add the location to the database</Text>
      <Text style={styles.heading}>Map screen</Text>
      <Text style={styles.subHeading}>Touch the pin to view more information</Text>
      <Text style={styles.text}>The pin colour refers to the type of the location</Text>
      <Text style={styles.text}><Text style={{color: 'red'}}>Red</Text>: Your current location</Text>
      <Text style={styles.text}><Text style={{color: 'blue'}}>Blue</Text>: A walk for you and your dog</Text>
      <Text style={styles.text}><Text style={{color: 'green'}}>Green</Text>: A vet</Text>
      <Text style={styles.text}><Text style={{color: 'turquoise'}}>Turquoise</Text>: A groomer for your dog</Text>
      <Text style={styles.text}><Text style={{color: 'orange'}}>Orange</Text>: A cafe that is welcoming to your dog</Text>
      <Text style={styles.heading}>Search screen</Text>
      <Text style={styles.subHeading}>This is a list of all locations.</Text>
      <Text style={styles.text}>Each entry shows the type (using an icon), the name and the area it is in.</Text>
      <Text style={styles.text}>Touch the list item to view a screen showing more information about the location</Text>
      </View>
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    margin: 5,
    marginTop: 20,
    textAlign: 'center'
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: 12,
    margin: 5,
    textAlign: 'center'
  },
});