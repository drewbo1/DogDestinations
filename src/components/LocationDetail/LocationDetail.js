import React from 'react';
import MapView from 'react-native-maps';
import { Modal, View, Text, Image, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import beaglePic from '../../assets/beagle.jpg';
import { Rating } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
 

const locationDetail = props => {
    let modalContent = null;
    ;
    if(props.selectedLocation) {
        modalContent = (
            <View>
            <Image source={beaglePic} style={styles.locationImage}/>
            <Text style={styles.locationName}>{props.selectedLocation.name}</Text>
            <MapView
            style={styles.map}
              initialRegion={{
                  latitude: props.selectedLocation.coordinates.latitude,
                  longitude: props.selectedLocation.coordinates.longitude,
                  latitudeDelta: 0.0922,
    longitudeDelta:
      Dimensions.get("window").width /
      Dimensions.get("window").height *
      0.0122
              }}
              ref={ref => this.map = ref}> 
              <MapView.Marker coordinate={{latitude: props.selectedLocation.coordinates.latitude, longitude:  props.selectedLocation.coordinates.longitude,}} />
            </MapView>
            <Text style={styles.locationArea}>Area: {props.selectedLocation.area}</Text>
            <Text style={styles.locationType}>Type: {props.selectedLocation.type}</Text>
            <Text style={styles.locationDesc}>Description: {props.selectedLocation.description}</Text>
            <Rating  
            ratingCount={5} 
            startingValue={props.selectedLocation.rating}
            readonly
            />
            </View>
        );
    }
    return(
        
    <Modal onRequestClosed={props.onModalClosed} 
    visible={props.selectedLocation !== null} animationType="slide">
    <ScrollView>
        <View style={styles.modalContainer}>
            {modalContent}
            <View>
               
                <Button style={styles.closeButton} title='close' onPress={props.onModalClosed}/>
                <TouchableOpacity onPress={props.onItemDeleted}>
                <View style={styles.deleteButton}>
                    <Icon size={30} name='ios-trash' color='red'/>
                </View>  
                </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
    </Modal>
    
    )};

    const styles = StyleSheet.create({
        modalContainer: {
            margin: 22,
        },
        locationImage: {
            width:'100%',
            height: 100, 
            paddingBottom: 15
        },
        locationName: {
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 28
        },
        locationType: {
            fontWeight: "bold",
            fontSize: 18
        },
        locationDesc: {
            fontWeight: "bold",
            fontSize: 15
        },
        locationArea: {
            fontWeight: "bold",
            fontSize: 18
        },
        
        deleteButton: {
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginTop: 15
        }, 
        map: {
            width: '100%',
            height: 100
        }, 
        closeButton: {
            marginTop: 15,
        }

    });

export default locationDetail;