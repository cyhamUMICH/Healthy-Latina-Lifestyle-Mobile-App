import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase from 'firebase';


const EditAccount = (props) => {
function deleteAccount(){
var user = firebase.auth().currentUser;

user.delete().then(function() {
  // User deleted.
}, function(error) {
  // An error happened.
});
props.navigation.navigate("Login")}

  return (
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
      <View style={styles.smallerWidthWindow}>
        <Image 
        source={require('../../assets/temporary/Meditation3.png')} 
        style={styles.editAccountProfile}
        />

     
        <Button 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Change profile picture"
        />


      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="name"
          placeholderTextColor={colors.text}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="username"
          placeholderTextColor={colors.text}
        />
 
        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="email"
          placeholderTextColor={colors.text}
        />
      </View>

      <Button 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Change password" onPress={() => props.navigation.navigate("PasswordReset")}
        />

      <Button 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Update profile information" onPress={() => props.navigation.navigate("Temp")}
        />
        <Button
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                title="Delete Account" onPress={() => deleteAccount()}
                />
     </View>
     </View>
    </View>
  );
};

export default EditAccount;