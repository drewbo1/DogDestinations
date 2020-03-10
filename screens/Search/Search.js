import React, { Component } from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { Icon } from "react-native-elements";
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
      };
  };

    locationSelectedHandler = key => {
    this.props.onSelectLocation(key);
    this.props.navigation.navigate('Location', {LocationKey: key})
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
    backgroundColor: "#fff"
  }
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
