import React from "react";
import { StyleSheet, Image, Text, View, ScrollView } from "react-native";
import * as firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Icon, Card } from "react-native-elements";
import profileImage from "./../../src/assets/walking.jpg";
import { TouchableOpacity } from "react-native-gesture-handler";


export default class Home extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Home",
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

  state = { currentUser: null };

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });
    
  }

  render() {
    const { currentUser } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.topper}>
            <Image
              source={profileImage}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50 / 2,
                margin: 20
              }}
            />
            <Text style={styles.welcome}>
              Hi {currentUser.email},{"\n"} how is Scarlet today?
            </Text>
          </View>
          <Text style={styles.heading}>Welcome to Dog Destinations</Text>

          <Text style={styles.heading}>New alerts</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.push("CardInfo")}
          >
            <Card
              style={{ marginBottom: 10 }}
              icon={<Icon name="warning" color="red" />}
              title="Lost Dog"
            >
              <Text style={{ marginBottom: 10 }}>
                My beagle has run away, last seen in Crossgar.
              </Text>
              <Text style={{ marginBottom: 10, color: "red" }}>
                County Down
              </Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.push("CardInfo")}
          >
            <Card
              style={{ marginBottom: 10 }}
              icon={<Icon name="warning" color="red" />}
              title="Poisoned meat"
            >
              <Text style={{ marginBottom: 10 }}>
                Poisoned meat found on path in Ormeau Park. Take care of your
                pets.
              </Text>
              <Text style={{ marginBottom: 10, color: "red" }}>
                County Antrim
              </Text>
            </Card>
          </TouchableOpacity>

          <Text style={styles.heading}>New locations</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.push("CardInfo")}
          >
            <Card style={{ marginBottom: 10 }} title="Stormont">
              <Text style={{ marginBottom: 10 }}>
                A large enclosed off-lead exercise area. Great for running your
                dog.
              </Text>
              <Text style={{ marginBottom: 10, color: "green" }}>Belfast</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.push("CardInfo")}
          >
            <Card style={{ marginBottom: 10 }} title="No Alibis">
              <Text style={{ marginBottom: 10 }}>
                A great bookshop on Botanic Avenue, always has water and treats
                for your dog outside the shop.
              </Text>
              <Text style={{ marginBottom: 10, color: "green" }}>
                Belfast City Centre
              </Text>
            </Card>
          </TouchableOpacity>

          <Text style={styles.heading}>New events</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.push("CardInfo")}
          >
            <Card style={{ marginBottom: 10 }} title="Beaglefest">
              <Text style={{ marginBottom: 10 }}>
                A meet up for all Beagle lovers. 1/9/19
              </Text>
              <Text style={{ marginBottom: 10, color: "blue" }}>Stormont</Text>
            </Card>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.push("CardInfo")}
          >
            <Card style={{ marginBottom: 10 }} title="Jack Russell fan club">
              <Text style={{ marginBottom: 10 }}>
                A get together for Jack Russell fans in Northern Ireland.
                17/10/19
              </Text>
              <Text style={{ marginBottom: 10, color: "blue" }}>
                Ormeau Park
              </Text>
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  heading: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
    textDecorationLine: "underline"
  },
  banner: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  topper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  welcome: {
    marginTop: 40
  }
});
