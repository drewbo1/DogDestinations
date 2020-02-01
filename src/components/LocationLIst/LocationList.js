import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Rating } from 'react-native-elements';

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
        title={info.item.name} 
        locationImage={info.item.image}
        locationType={info.item.type}
        subtitle={info.item.area}
        leftIcon={{name: typeIcon[info.item.type], type: "ionicon"}}
        rightElement={<Rating 
        ratingCount={5}
        readonly
        startingValue={info.item.rating}/>}
        onPress={() => props.onItemSelected(info.item.key)}
        bottomDivider  
        />
        )}
       
        />
      );
};

const styles = StyleSheet.create({
    listContainer: {
       
        height: "90%"
      },
      
});

export default locationList;