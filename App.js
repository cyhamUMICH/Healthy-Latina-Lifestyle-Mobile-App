import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/components/DrawerNavigation';
import * as firebase from 'firebase/app';
import { LogBox } from 'react-native';

const App = () => {

  // Supress warning about timer that is caused when connecting to firebase
  // It is a bug so it can safely be supressed:
  // https://stackoverflow.com/questions/44603362/setting-a-timer-for-a-long-period-of-time-i-e-multiple-minutes/48778011#48778011
  // Supress warning about navigation state:
  // https://reactnavigation.org/docs/troubleshooting/#i-get-the-warning-non-serializable-values-were-found-in-the-navigation-state
  LogBox.ignoreLogs(['Setting a timer', 'Non-serializable values were found in the navigation state']);

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyAKuVcL0xLDktqHubVs6uC0Lhm_i-P4F5Q",
      authDomain: "healthy-latina-lifestyle.firebaseapp.com",
      databaseURL: "https://healthy-latina-lifestyle-default-rtdb.firebaseio.com",
      projectId: "healthy-latina-lifestyle",
      storageBucket: "healthy-latina-lifestyle.appspot.com",
      messagingSenderId: "860970927043",
      appId: "1:860970927043:web:329d3f22ef2434884f3376",
      measurementId: "G-JZXQPQ4TRM"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    else {
      firebase.app(); // if already initialized, use that one
    }
  }, []);

  return (
    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>
  );
}

export default App;