import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-elements";

const RatingOutput = props => {
   
  return (
    <View style={styles.container}>
      <Rating 
      startingValue={props.ratingNumber} 
      readonly
      imageSize={props.size} />
      <Text style={styles.text}>({props.totalRatings})</Text>
    </View>
  );
};

export default RatingOutput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    marginLeft: 10,
    marginRight: 10
  }
});
