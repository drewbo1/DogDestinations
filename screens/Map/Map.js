import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { Icon } from "react-native-elements";
import {
  deleteLocation,
  selectLocation,
  deselectLocation,
  getLocations
} from "./../../src/store/actions/index";
import { connect } from "react-redux";
//import CustomCalloutView from "../../../src/components/CustomCalloutView/CustomCalloutView";
import { withNavigation } from "react-navigation";
import Orientation from "react-native-orientation";
import CustomMarkers from "./../../src/components/CustomMarkers/CustomMarkers";
import LocationDetail from "./../../src/components/LocationDetail/LocationDetail";

class MapTest extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Map",
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

  state = {
    focusedLocation: {
      latitude: 54.787715,
      longitude: -6.492315,
      latitudeDelta: 1.4,
      longitudeDelta:
        (Dimensions.get("window").width / Dimensions.get("window").height) *
        0.0122
    },
    locationChosen: false
  };

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            }
          }
        };
        this.pickLocationHandler(coordsEvent);
      },
      err => {
        console.log(err);
        alert("Fetching the Position failed, please pick one manually!");
      }
    );
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.props.onLoadLocations();
      this.getLocationHandler();
      Orientation.lockToPortrait();
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  locationSelectedHandler = key => {
    this.props.onSelectLocation(key);
  };

  locationDeletedHandler = () => {
    this.props.onDeleteLocation();
  };

  modalClosedHandler = () => {
    this.props.onDeselectLocation();
  };

  render() {
    let userLocationMarker = null;

    if (this.state.locationChosen) {
      userLocationMarker = (
        <MapView.Marker
          coordinate={this.state.focusedLocation}
          title="You are here"
        />
      );
    }

   

    return (
      <View style={styles.container}>
       

        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          ref={ref => (this.map = ref)}
        >
          <CustomMarkers
            locations={this.props.locations}
            onItemSelected={this.locationSelectedHandler}
          />
            {userLocationMarker}
        </MapView>
        <LocationDetail
          selectedLocation={this.props.selectedLocation}
          onItemDeleted={this.locationDeletedHandler}
          onModalClosed={this.modalClosedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: "100%"
  },
 
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
  connect(mapStateToProps, mapDispatchToProps)(MapTest)
);
