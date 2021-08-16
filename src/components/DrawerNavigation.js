import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from './SideMenu';
import StackNavigation from './StackNavigation';
import { colors } from '../styles/Colors';

import firebase from 'firebase';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: colors.accentBackground}}
      drawerContent={SideMenu}
      drawerPosition="right"
    >
    <Drawer.Screen name="StackNavigation" component={StackNavigation}
      options={() => {
        // Don't allow opening the drawer if you aren't logged in
        if (!firebase.apps.length || firebase.auth().currentUser == null)
          return ({gestureEnabled: false});
      }}  
    />
  </Drawer.Navigator>
  );
};

export default DrawerNavigation;