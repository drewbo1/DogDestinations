import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Picker, ScrollView, Keyboard, ActivityIndicator, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Rating, Input, Button, Text } from 'react-native-elements'
import { addLocation } from './../../src/store/actions/index'
import PickLocation from './../../src/components/PickLocation/PickLocation';


class Add extends Component {

  state = {
    
    controls: {
      locationName: {
        value: "",
      },
      coordinates: {
        value: null,
      },
      locationType: {
        value: "",
      },
      locationDesc: {
        value: "",
      },
      locationArea: {
        value: "",
      },
      locationRating: {
        value: "", 
      }
    }
  };
  
     static navigationOptions = {
    title: 'Add',
    };
   
    locationAddedHandler = () => {
      this.props.onAddLocation(
       this.state.controls.locationName.value,
       this.state.controls.locationType.value,
       this.state.controls.coordinates.value,
       this.state.controls.locationDesc.value,
       this.state.controls.locationArea.value,
       this.state.controls.locationRating.value,
       this.props.navigation.goBack()
     );
    };

    
    locationPickedHandler = coordinates => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            coordinates: {
              value: coordinates,
            }
          }
        };
      });
    };

    locationNameChangedHandler = val => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            locationName: {
              ...prevState.controls.locationName,
              value: val,
            }
          }
        };
      });
    };

    locationTypeChangedHandler = val => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            locationType: {
            ...prevState.controls.locationType,
            value: val,
            }
          }
        };
      });
      
    };
    
    locationDescChangedHandler = val => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            locationDesc: {
            ...prevState.controls.locationDesc,
            value: val,
            }
          }
        };
      });
    };

    locationAreaChangedHandler = val => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            locationArea: {
            ...prevState.controls.locationArea,
            value: val,
            }
          }
        };
      });
    };

    locationRatingChangedHandler = rating => {
      this.setState(prevState => {
        return {
          controls: {
            ...prevState.controls,
            locationRating: {
            ...prevState.controls.locationRating,
            value: rating,
            }
          }
        };
      });
    };



    handleKeyDown = (e) => {
      if(e.nativeEvent.key == "Enter"){
          Keyboard.dismiss();
      };
  };

  
    


   render() {
     
    let addButton = (
      <Button 
            title='Add location'
            style={styles.locationButton}
            onPress={this.locationAddedHandler}
            />
    );

    if (this.props.isLoading) {
      addButton = <ActivityIndicator />;
    };

    
    return (

        <SafeAreaView>
     <ScrollView> 
     <View style={styles.container}>
     <Text style={styles.heading}>Add a new location</Text>
     <Text style={styles.subHeading}>Complete the information below to add a location to our list.</Text>
     
     <Input
            style={styles.locationNameInput}
            placeholder='Name of location'
            onChangeText={this.locationNameChangedHandler}  
            value={this.state.locationName} 
            />
        <Picker
            style={styles.locationType}
            selectedValue={this.state.locationType}
            onValueChange={this.locationTypeChangedHandler} 
            value={this.state.locationType}>

            <Picker.Item label="Please select a location type" value="" />
            <Picker.Item label="Walk" value="walk" />
            <Picker.Item label="Vet" value="vet" />
            <Picker.Item label="Cafe" value="cafe" />
            <Picker.Item label="Groomer" value="groomer" />
            </Picker>
            <Input
            style={styles.locationDesc}
             multiline = {true}
             numberOfLines = {4}
            onChangeText={this.locationDescChangedHandler}
            value={this.state.locationDesc}
            placeholder='Description of location'
            onKeyPress={this.handleKeyDown}
            />
            <Input
            style={styles.locationArea}
            onChangeText={this.locationAreaChangedHandler}
            value={this.state.locationArea}
            placeholder='Area of location'
            onKeyPress={this.handleKeyDown}
            />
            <PickLocation 
            onLocationPick={this.locationPickedHandler} 
            />
            <Rating
            showRating
            count= '(10)'
            onFinishRating={this.locationRatingChangedHandler}
            style={{ marginTop: 20 }}
            />
      <View>{addButton}</View>
       
     </View> 
     </ScrollView>
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  map: {
    height: 100,
  },
  button: {
    width: 250,
    marginBottom: 10
  },
  locationButton: {
        width: 250,
        marginBottom: 10
  }, 
  locationNameInput: {
      marginBottom: 10,
       
  },
  locationType: {
    width: "90%",
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  locationDesc: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',

  },
  locationArea: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',

  }, 
  heading: {
    fontWeight: 'bold',
    fontSize: 20,
    textDecorationLine: 'underline',
    margin: 15,
  },
  subHeading: {
    fontWeight: 'bold',
    fontSize: 12,
    margin: 10,
  }
  
});



const mapDispatchToProps = dispatch => {
  return {
      onAddLocation: (locationName, locationType, coordinates, locationDesc, locationArea, locationRating) => dispatch(addLocation(locationName, locationType, coordinates, locationDesc, locationArea, locationRating))
      
      };
};

export default connect(null, mapDispatchToProps)(Add);