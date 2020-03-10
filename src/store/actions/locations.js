import {
  DELETE_LOCATION,
  SELECT_LOCATION,
  DESELECT_LOCATION,
  SET_LOCATIONS
} from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import * as firebase from "firebase";
import { snapshotToArray } from "../../components/Extras/Extras";

export const addLocation = (
  locationName,
  selected1,
  coordinates,
  locationDesc,
  locationArea,
  locationRating,
  userId
) => {
  return dispatch => {
    dispatch(uiStartLoading());
    /*const locationData = {
            name: locationName,
            type: locationType,
            coordinates: coordinates,
            description: locationDesc,
            area: locationArea,
            rating: locationRating
           
        };
        fetch("https://tm470-b482f.firebaseio.com/locations.json", {
            method: "POST",
            body: JSON.stringify(locationData)
        })*/
    firebase
      .database()
      .ref("locations/")
      .push({
        name: locationName,
        type: selected1,
        coordinates: coordinates,
        description: locationDesc,
        area: locationArea,
        ratingNumber: locationRating,
        totalRatings: 1,
        totalRatingsStars: locationRating,
        created_at: Date.now(),
        userId: userId
      })
      .then(() => dispatch(uiStopLoading()))
      .then(alert("Location added"))
      .catch(err => {
        console.log(err);
        alert(
          "Something went wrong, sorry. The location could not be added. Check your internet connection :/"
        );
        dispatch(uiStopLoading());
      });
  };
};

export const getLocations = () => {
  return dispatch => {
    dispatch(uiStartLoading());
    firebase
      .database()
      .ref("/locations")
      .once("value", snapshot => {
        const locations = snapshotToArray(snapshot);
        dispatch(setLocations(locations));
        dispatch(uiStopLoading());
      })
      .catch(err => {
        alert(
          "Something went wrong, sorry. The locations could not be fetched. Check your internet connection. :/"
        );
        dispatch(uiStopLoading());
        console.log(err);
      });
  };
};

export const setLocations = locations => {
  return {
    type: SET_LOCATIONS,
    locations: locations
  };
};

export const deleteLocation = () => {
  return {
    type: DELETE_LOCATION
  };
};

export const selectLocation = key => {
  return {
    type: SELECT_LOCATION,
    locationKey: key
  };
};

export const deselectLocation = () => {
  return {
    type: DESELECT_LOCATION
  };
};
