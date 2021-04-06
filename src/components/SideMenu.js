import React from 'react';
import { Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { styles } from '../styles/Styles';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Edit Account</Text>
      <Text>Log Out</Text>
    </DrawerContentScrollView>
  );
};

export default SideMenu;