import React from "react";
import MapView from "react-native-maps";
import {
  Modal,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView
} from "react-native";
import beaglePic from "../../assets/beagle.jpg";
import RatingOutput from "../RatingOutput/RatingOutput";
import { globalStyles } from "../../../styles/global";
import Icon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

const locationDetail = props => {
  let modalContent = null;

  const typeIcon = {
    walk: "ios-walk",
    vet: "ios-medkit",
    groomer: "ios-cut",
    cafe: "ios-cafe"
  };

  if (props.selectedLocation) {
    modalContent = (
      <View>
        <View style={styles.header}>
          <Button
            style={styles.closeButton}
            title="close"
            onPress={props.onModalClosed}
          />
        </View>
        <View style={globalStyles.splitBox}>
          <View style={globalStyles.box}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: props.selectedLocation.coordinates.latitude,
                longitude: props.selectedLocation.coordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta:
                  (Dimensions.get("window").width /
                    Dimensions.get("window").height) *
                  0.0122
              }}
              ref={ref => (this.map = ref)}
            >
              <MapView.Marker
                coordinate={{
                  latitude: props.selectedLocation.coordinates.latitude,
                  longitude: props.selectedLocation.coordinates.longitude
                }}
              />
            </MapView>
          </View>
          <View style={globalStyles.box}>
            <Icon
              name={typeIcon[props.selectedLocation.type]}
              type="ionicon"
              size={75}
            />
          </View>
        </View>
        <View style={globalStyles.box}>
          <Text style={{ fontSize: 35 }}>{props.selectedLocation.name}</Text>
        </View>
        <View style={globalStyles.splitBox}>
          <View style={globalStyles.box}>
            <Text style={{ fontSize: 20 }}>{props.selectedLocation.area}</Text>
          </View>
          <View style={globalStyles.box}>
            <RatingOutput
              ratingCount={5}
              size={25}
              readonly
              totalRatings={props.selectedLocation.totalRatings}
              totalStars={props.selectedLocation.totalStars}
              ratingNumber={props.selectedLocation.ratingNumber}
            />
          </View>
        </View>
        <View style={globalStyles.box}>
          <Text>{props.selectedLocation.description}</Text>
        </View>
        <View style={globalStyles.splitBox}>
          <View style={globalStyles.box}>
            <Text>{props.selectedLocation.userId}</Text>
          </View>
          <View style={globalStyles.box}>
            <Text>{props.selectedLocation.created_at}</Text>
          </View>
        </View>
        <View style={globalStyles.splitBox}>
          <View style={globalStyles.box}>
            <Text>Reviews</Text>
          </View>
          <View style={globalStyles.box}>
            <Text>Add a review</Text>
          </View>
        </View>
        <View style={globalStyles.splitBox}>
          <View style={globalStyles.box}>
            <Text>Rate</Text>
          </View>
          <View style={globalStyles.box}></View>
        </View>
      </View>
    );
  }
  return (
    <Modal
      onRequestClosed={props.onModalClosed}
      visible={props.selectedLocation !== null}
      animationType="slide"
    >
      <SafeAreaView>
        <ScrollView>
          <View style={globalStyles.container}>{modalContent}</View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "flex-start",
    margin: 20
  },
  map: {
    width: "100%",
    height: 150,
  }
});

export default locationDetail;
