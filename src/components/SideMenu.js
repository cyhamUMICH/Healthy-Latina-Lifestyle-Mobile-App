import React from 'react';
import { Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { styles } from '../styles/Styles';
import { Button } from 'react-native';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Button title="Edit Account" onPress={() => props.navigation.navigate("EditAccount")} />
      <Button title="Log out" onPress={() => props.navigation.navigate("Login")} />
    </DrawerContentScrollView>
  );
};

export default SideMenu;