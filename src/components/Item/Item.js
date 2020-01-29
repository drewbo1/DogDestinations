import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Icon, Rating, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';



const Item = props => (
   


    <TouchableOpacity onPress={props.onItemPressed}>
    <ListItem 
        leftIcon={{name: props.locationIcon}}
        title={{title: props.locationName}}
        subtitle={{subtitle: props.locationArea}}
         />
       
        
        
    
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    
   
    
});

export default Item;