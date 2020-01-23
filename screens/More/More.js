import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Icon, Card } from 'react-native-elements'
import proCardImage from '../../../src/assets/profile-dogs.jpg' 
import alertImage from '../../../src/assets/alert.jpg'

export default class More extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: 'More',
    headerRight: (
      <Icon
      name="ios-add"
      type="ionicon"
      size= {50}
      iconStyle= {{ paddingRight: 20 }}
      onPress={() => navigation.push('Add')}
      />
    ),
  };
};

  

  render() {
    
    return (

      <ScrollView>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => this.props.navigation.push('Profile')}>
       <Card
       style={{width: '90%'}}
       image={proCardImage}
         title='Profile'
         >
         <Text>
           Touch here to edit your profile
         </Text>
       </Card>
       </TouchableOpacity>
       <TouchableOpacity onPress={() => this.props.navigation.push('Alerts')}>
       <Card
       style={{width: '90%'}}
        image={alertImage}
       title='Information'
       >
       <Text>
       Touch here for information
       </Text>
      </Card>
      </TouchableOpacity>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})