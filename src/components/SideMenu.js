import React from 'react';
import { Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>

    <Button
            buttonStyle={styles.basicButtons}
            title="See Group"  onPress={() => props.navigation.navigate("Groups")}
            />

        <Button 
        buttonStyle={styles.basicButtons}
        title="Edit Account"  onPress={() => props.navigation.navigate("EditAccount")} 
        />

        <Button 
        buttonStyle={styles.basicButtons}
        title="Log out"  onPress={() => props.navigation.navigate("Login")} 
        />

    </DrawerContentScrollView>
  );
};

export default SideMenu;