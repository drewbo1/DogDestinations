import React from "react";
import { Marker } from "react-native-maps";


const locationMarker = props => {
  const markerColor = {
    walk: "blue",
    vet: "green",
    cafe: "orange",
    groomer: "turquoise"
  };

  return props.locations.map(marker => (
    <Marker
      coordinate={marker.coordinates}
      key={marker.key}
      pinColor={markerColor[marker.type]}
      style={{ width: 15, height: 15 }}
      type={marker.type}
      onPress={() => props.onItemSelected(marker.key)}
    ></Marker>
  ));
};

export default locationMarker;
