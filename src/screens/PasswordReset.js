import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { CommonActions } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { Component } from 'react-native';
import firebase from 'firebase';

import { Alert } from 'react-native';




const PasswordReset = (props) => {

const[email, setEmail] = useState('');

function createOneButtonAlertForNotValidEmail(){
Alert.alert(
      "Invalid Email",
      "Please enter a valid email address associated with an account.",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
}

function createOneButtonAlertForSentEmail(){
  Alert.alert(
    "Email Sent",
    "An email has been sent to the account associated with that email. Please use the link provided to update your password." +
      (firebase.auth().currentUser !== null ? "\n\nNote: You will be logged out now." : ""),
    [
      { 
        text: "OK",
        onPress: () => {
          if (firebase.auth().currentUser !== null) {
            firebase.auth().signOut().then(() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Login' },
                  ],
                })
              );
            });
          }
        }
      }
    ]
  );
}

function sendEmail(){
firebase
.auth()
.sendPasswordResetEmail(email)

createOneButtonAlertForSentEmail();

}

function reset(){
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;//somehow makes sure that its an email
var checkEmail = email;
if (reg.test(checkEmail) === false) {
createOneButtonAlertForNotValidEmail()

  }
  else
  {
   const dbh = firebase.firestore();
        // Code from: https://stackoverflow.com/questions/62524946/firestore-check-if-id-exists-against-an-array-of-ids
        dbh.collection("Users").where("email", "==", checkEmail)
        .get().then((doc) =>{
         if (doc.size > 0){
        sendEmail();}
        else
        {
        console.log(doc);
        createOneButtonAlertForNotValidEmail()
        }
        })
}
}
return(
<View style={styles.app}>

    <View style={styles.fullWidthWindow}>
      <View style={styles.smallerWidthWindow}>
      <View style={styles.inputView}>

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="email"
          placeholderTextColor={colors.text}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Send Reset Email"  onPress={() => reset()}
        />

      </View>
      </View>
</View>
);
};
export default PasswordReset;