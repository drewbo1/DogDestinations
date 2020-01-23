import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Icon, Rating } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';



const listItem = props => (
   


    <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
        <Icon name={props.locationIcon}
        type='ionicon'
        size={35} />
        <Text style={styles.name}>{props.locationName}</Text>
        <Text style={styles.area}>{props.locationArea}</Text>
        
    </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        flexDirection: 'row',
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
   
    name: {
        
        paddingLeft: 20,
    },
    area: {
       
        paddingLeft: 20,
        color: 'red'
    }
});

export default listItem;