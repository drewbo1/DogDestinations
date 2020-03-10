import React, { Component } from "react";
import { Text, View } from "react-native";
import { globalStyles } from '../../styles/global';
import { withNavigation } from "react-navigation";

export default class Location extends Component {
  render() {
    return (
      <View style={globalStyles.container}>
      <Text>Hi there</Text>
      <Text>{ this.props.navigation.getParam('selectedLocation.name')}</Text>
    </View>
    );
  }
}


