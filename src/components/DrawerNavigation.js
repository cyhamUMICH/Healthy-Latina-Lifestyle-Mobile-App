import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SideMenu from './SideMenu';
import StackNavigation from './StackNavigation';
import { colors } from '../styles/Colors';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: colors.accentBackground}}
      drawerContent={SideMenu}
      drawerPosition="right"
    >
    <Drawer.Screen name="StackNavigation" component={StackNavigation}></Drawer.Screen>
  </Drawer.Navigator>
  );
};

export default DrawerNavigation;