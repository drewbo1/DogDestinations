import { DELETE_LOCATION, SELECT_LOCATION, DESELECT_LOCATION, SET_LOCATIONS } from '../actions/actionTypes';


const initialState = {
    locations: [],
    selectedLocation: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
            case SET_LOCATIONS:
                return {
                    ...state,
                    locations: action.locations
                }
            case DELETE_LOCATION:
                return {
                    ...state,
                    locations: state.locations.filter(location => {
                        return location.key !== state.selectedLocation.key;
                      }),
                      selectedLocation: null
                    };
             case SELECT_LOCATION:
                 return {
                    ...state,
                    selectedLocation:state.locations.find(location => {
                        return location.key === action.locationKey;
                      })
                 }; 
                 case DESELECT_LOCATION:
                     return {
                         ...state,
                    selectedLocation: null
                     };  
        default:
            return state;
    }
};

export default reducer;