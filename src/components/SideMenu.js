import React from 'react';
import { Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { styles } from '../styles/Styles';
import { Button } from 'react-native';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>Edit Account</Text>
      <Button title="Log out" onPress={() => props.navigation.navigate("Login")} />
    </DrawerContentScrollView>
  );
};

export default SideMenu;