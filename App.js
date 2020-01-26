import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store/storeConfig";
import * as firebase from "firebase";

import Navigator from "./navigator/Navigator";

const store = configureStore();

export default class App extends Component {
  componentDidMount() {
    firebase.initializeApp({
    apiKey: "AIzaSyADjp3ZVLLGGh9WLenYD3p7fcW3XKewEEc",
      authDomain: "dog-destinations.firebaseapp.com",
      databaseURL: "https://dog-destinations.firebaseio.com",
      projectId: "dog-destinations",
      storageBucket: "dog-destinations.appspot.com",
      messagingSenderId: "319623885326",
      appId: "1:319623885326:web:7baec18765e37dffe9825f",
      measurementId: "G-BKT25P7YCV"
    })
  };

  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
