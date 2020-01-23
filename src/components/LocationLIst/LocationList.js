import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

import ListItem from '../ListItem/ListItem';

const locationList = props => {
 
  const typeIcon = {
    walk: 'ios-walk',
    vet: 'ios-medkit',
    groomer: 'ios-cut',
    cafe: 'ios-cafe'
  };
 
      return (
        <FlatList 
        style={styles.listContainer}
        data={props.locations.sort((a,b) => a.name.localeCompare(b.name))}
        renderItem={(info) => (
            <ListItem
        locationName={info.item.name} 
        locationImage={info.item.image}
        locationType={info.item.type}
        locationArea={info.item.area}
        locationIcon={typeIcon[info.item.type]}
        locationRating={info.item.rating}
        onItemPressed={() => props.onItemSelected(info.item.key)}  
        />
        )}
       
        />
      );
};

const styles = StyleSheet.create({
    listContainer: {
        width: "90%",
        height: "80%"
      },
      
});

export default locationList;