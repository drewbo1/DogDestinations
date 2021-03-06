import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/store/storeConfig";
import Navigator from "./navigator/Navigator";
import * as firebase from 'firebase';
import { firebaseConfig } from './config';

if(!firebase.apps.length) {

  firebase.initializeApp(firebaseConfig);
  console.log('Firebase has started');
}


const store = configureStore();

export default class App extends Component {

    
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
