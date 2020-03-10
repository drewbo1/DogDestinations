import React, { Component } from "react";
import { Fragment } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Keyboard,
  SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { Rating, Text, Button } from "react-native-elements";
import { addLocation } from "./../../src/store/actions/index";
import PickLocation from "./../../src/components/PickLocation/PickLocation";
import FormInput from "../../src/components/FormInput/FormInput";
import FormButton from "../../src/components/FormButton/FormButton";
import ErrorMessage from "../../src/components/ErrorMessage/ErrorMessage";
import * as firebase from "firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { Picker } from "native-base";

const Item = Picker.Item;

const validationSchema = Yup.object().shape({
  locationName: Yup.string()
    .label("Name")
    .required()
    .min(8, "Must have at least 8 characters"),
  locationDesc: Yup.string()
    .label("Description")
    .required()
    .min(10, "Must have at least 30 characters"),
  locationArea: Yup.string()
    .label("Area")
    .required()
    .min(4, "Must have at least 4 characters")
});

class Add extends Component {
  state = {
    controls: {
      locationName: {
        value: ""
      },
      coordinates: {
        value: null
      },
      locationType: {
        value: "walk"
      },
      locationDesc: {
        value: ""
      },
      locationArea: {
        value: ""
      },
      locationRating: {
        value: ""
      },
      userId: {
        value: ""
      }
    },
    selectedItem: undefined,
    selected1: "",
    results: {
      items: []
    }
  };

  static navigationOptions = {
    title: "Add"
  };

  componentDidMount() {
    this.getCurrentUser();
  }

  locationAddedHandler = (values, actions) => {
    const { locationName, locationDesc, locationArea } = values;
    this.props.onAddLocation(
      locationName,
      this.state.selected1,
      this.state.controls.coordinates.value,
      locationDesc,
      locationArea,
      this.state.controls.locationRating.value,
      this.state.controls.userId.value,
      this.props.navigation.goBack()
    );
  };

  getCurrentUser = () => {
    const userId = firebase.auth().currentUser.uid;
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          userId: {
            value: userId
          }
        }
      };
    });
  };

  locationPickedHandler = coordinates => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          coordinates: {
            value: coordinates
          }
        }
      };
    });
  };

  locationRatingChangedHandler = rating => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          locationRating: {
            ...prevState.controls.locationRating,
            value: rating
          }
        }
      };
    });
  };

  handleKeyDown = e => {
    if (e.nativeEvent.key == "Enter") {
      Keyboard.dismiss();
    }
  };
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Add a new location</Text>
            <Text style={styles.subHeading}>
              Complete the information below to add a location to our list.
            </Text>

            <Formik
              initialValues={{
                locationName: "",
                locationDesc: "",
                locationArea: ""
              }}
              onSubmit={(values, actions) => {
                this.locationAddedHandler(values, actions);
              }}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                values,
                handleSubmit,
                errors,
                isValid,
                isSubmitting,
                touched,
                handleBlur
              }) => (
                <Fragment>
                  <FormInput
                    name="locationName"
                    value={values.locationName}
                    onChangeText={handleChange("locationName")}
                    placeholder="Enter a name for the location"
                    onBlur={handleBlur("locationName")}
                  />
                  <ErrorMessage
                    errorValue={touched.locationName && errors.locationName}
                  />
                  <FormInput
                    name="locationDesc"
                    value={values.locationDesc}
                    onChangeText={handleChange("locationDesc")}
                    placeholder="Enter a description of the location"
                    onBlur={handleBlur("locationDesc")}
                    multiline={true}
                  />
                  <ErrorMessage
                    errorValue={touched.locationDesc && errors.locationDesc}
                  />
                  <FormInput
                    name="locationArea"
                    value={values.locationArea}
                    onChangeText={handleChange("locationArea")}
                    placeholder="Enter an area for the location"
                    onBlur={handleBlur("locationArea")}
                  />
                  <ErrorMessage
                    errorValue={touched.locationArea && errors.locationArea}
                  />

                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    style={{ width: "100%" }}
                    placeholder="Pick a location type"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)}
                  >
                    <Item label="Walk" value="walk" />
                    <Item label="Vet" value="vet" />
                    <Item label="Cafe" value="cafe" />
                    <Item label="Groomer" value="groomer" />
                  </Picker>

                  <PickLocation onLocationPick={this.locationPickedHandler} />
                  <Rating
                    showRating
                    onFinishRating={this.locationRatingChangedHandler}
                    style={{ marginTop: 20 }}
                    minValue={1}
                  />

                  <FormButton
                    onPress={handleSubmit}
                    style={styles.submitButton}
                    title="Add location"
                    buttonColor="#039BE5"
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </Fragment>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  submitButton: {
    width: "100%",
    marginBottom: 10
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    textDecorationLine: "underline",
    margin: 15
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 12,
    margin: 10
  },
  typeDropdown: {
    width: "100%"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddLocation: (
      locationName,
      selected1,
      coordinates,
      locationDesc,
      locationArea,
      locationRating,
      userId
    ) =>
      dispatch(
        addLocation(
          locationName,
          selected1,
          coordinates,
          locationDesc,
          locationArea,
          locationRating,
          userId
        )
      )
  };
};

export default connect(null, mapDispatchToProps)(Add);
