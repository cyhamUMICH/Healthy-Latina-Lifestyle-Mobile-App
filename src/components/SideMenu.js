import React from 'react';
import { Alert, View } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Button, Icon } from 'react-native-elements';
import firebase from 'firebase';
import { colors } from '../styles/Colors';
import { styles } from '../styles/Styles';

const SideMenu = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainer}>
      <View style={styles.drawerTopItemsView}>
        <Button
          icon={
            <Icon name="comments" type="font-awesome"
              size={styles.drawerIconSize}
              containerStyle={styles.drawerIconContainer}
              color={colors.text} 
            />
          }
          buttonStyle={styles.drawerButton}
          title="Chat Rooms"  onPress={() => props.navigation.navigate("ChatRoomHome")}
          titleStyle={styles.buttonText}
        />
        <Button
          icon={
            <Icon name="book"type="font-awesome"
              size={styles.drawerIconSize} 
              containerStyle={styles.drawerIconContainer}
              color={colors.text} 
            />
          }
          buttonStyle={styles.drawerButton}
          title="My Journal"  onPress={() => props.navigation.navigate("JournalEntryList")}
          titleStyle={styles.buttonText}
        />
        <Button 
          icon={
            <Icon name="user" type="font-awesome" 
              size={styles.drawerIconSize}
              containerStyle={styles.drawerIconContainer}
              color={colors.text} 
            />
          }
          buttonStyle={styles.drawerButton}
          title="Edit Account"  onPress={() => props.navigation.navigate("EditAccount")} 
          titleStyle={styles.buttonText}
        />
      </View>      
      <Button
        icon={
          <Icon name="sign-out" type="font-awesome"
            size={styles.drawerIconSize}
            containerStyle={styles.drawerIconContainer}
            color={colors.text}
          />
        }
        buttonStyle={styles.drawerButton}
        title="Log Out"  
        titleStyle={styles.buttonText}
        onPress={() => {
          firebase.auth().signOut().then(() => {
            // Navigate first, then reset to make sure the drawer has closed properly
            props.navigation.navigate("Login");
            props.navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [
                  { name: 'Login' },
                ],
              })
            );
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