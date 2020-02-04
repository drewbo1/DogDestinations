import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator, Text, SafeAreaView } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import { connect } from "react-redux";
import LocationList from "../../src/components/LocationLIst/LocationList.js";
import {
  deleteLocation,
  selectLocation,
  deselectLocation,
  getLocations
} from "../../src/store/actions/index";
import LocationDetail from "../../src/components/LocationDetail/LocationDetail";
import { withNavigation } from "react-navigation";


class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Search",
      headerRight: (
        <Icon
          name="ios-add"
          type="ionicon"
          size={50}
          iconStyle={{ paddingRight: 20 }}
          onPress={() => navigation.push("Add")}
        />
      )
    };
  };

  searchFilterFunction = text => {    
    const newData = this.props.locations.filter(info => {      
      const itemData = `${info.item.name.toUpperCase()}`;
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ data: newData });  
  };

  locationSelectedHandler = key => {
    this.props.onSelectLocation(key);
  };

  locationDeletedHandler = () => {
    this.props.onDeleteLocation();
  };

  modalClosedHandler = () => {
    this.props.onDeselectLocation();
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.onLoadLocations();
      
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  render() {
    let locList = (
      
      <LocationList
        style={styles.locationList}
        locations={this.props.locations}
        onItemSelected={this.locationSelectedHandler}
      />
    );
    if (this.props.isLoading) {
      locList = <ActivityIndicator size="large" />;
    }

    return (
       
      <View style={styles.container}>
       <SafeAreaView>
          
        
        
        <LocationDetail
          selectedLocation={this.props.selectedLocation}
          onItemDeleted={this.locationDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
        <View>{locList}</View>
        </SafeAreaView>
      </View>
     
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline",
    margin: 5,
    textAlign: "center"
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 12,
    margin: 5,
    textAlign: "center"
  },
  locationList: {}
});

const mapStateToProps = state => {
  return {
    locations: state.locations.locations,
    selectedLocation: state.locations.selectedLocation,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeleteLocation: () => dispatch(deleteLocation()),
    onSelectLocation: key => dispatch(selectLocation(key)),
    onDeselectLocation: () => dispatch(deselectLocation()),
    onLoadLocations: () => dispatch(getLocations())
  };
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);
