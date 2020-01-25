import { DELETE_LOCATION, SELECT_LOCATION, DESELECT_LOCATION, SET_LOCATIONS } from './actionTypes'; 
import { uiStartLoading, uiStopLoading} from './index';

export const addLocation = (locationName, locationType, coordinates, locationDesc,
    locationArea, locationRating) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const locationData = {
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
        })
        
        .then(res => res.json())
        .then(parsedRes => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
        })
        .then(alert('Location added'))
        .catch(err => {
            console.log(err);
            alert("Something went wrong, sorry. The location could not be added. Check your internet connection :/");
           dispatch(uiStopLoading()); 
        });
    };
        
};

export const getLocations = () => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://tm470-b482f.firebaseio.com/locations.json")
        
          .then(res => res.json())
          .then(parsedRes => {
              const locations = [];
              for (let key in parsedRes) {
                  locations.push({
                      ...parsedRes[key],
                      key: key
                  })
              }
            dispatch(setLocations(locations));
            dispatch(uiStopLoading());
          })
          .catch(err => {
            alert("Something went wrong, sorry. The locations could not be fetched. Check your internet connection. :/");
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

export const selectLocation = (key) => {
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