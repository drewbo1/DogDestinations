import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import configureStore from "./src/store/storeConfig";
import * as firebase from 'firebase';

const store = configureStore();



const DogDestinations = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => DogDestinations);
