import React from 'react';
import { Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props}>

        <Button
         buttonStyle={styles.basicButtons}
         title="Chat Rooms"  onPress={() => props.navigation.navigate("ChatRoomHome")}
          />

        <Button
         buttonStyle={styles.basicButtons}
         title="My Journal"  onPress={() => props.navigation.navigate("JournalEntryList")}
          />

          
        <Button 
        buttonStyle={styles.basicButtons}
        title="Edit Account"  onPress={() => props.navigation.navigate("EditAccount")} 
        />

        <Button 
        buttonStyle={styles.basicButtons}
        title="Log out"  onPress={() => {
          firebase.auth().signOut().then(() => {
            props.navigation.navigate("Login");
          })
          .catch((error) => {
            Alert.alert(
              "Error Logging Out",
              "There was an error when logging out of your account.",
              [
                {text: "OK"}
              ]
            );
          })}}
        />

    </DrawerContentScrollView>
  );
};

export default SideMenu;