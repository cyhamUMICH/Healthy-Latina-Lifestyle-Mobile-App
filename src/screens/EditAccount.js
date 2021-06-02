import React, {useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const EditAccount = (props) => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');

function createTwoButtonAlertForDelete(){
Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This CANNOT be undone",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteAccount() }
      ],
      { cancelable: true }
    );
}

function createTwoButtonAlertForUpdate(){
Alert.alert(
      "Update Account",
      "This will update all fields above, if you left them blank they will be set to nothing. Are you sure?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => updateProfile()}
      ],
      { cancelable: true }
    );
}

async function updateProfile(){

var user = firebase.auth().currentUser

console.log(user.uid)


const dbh = firebase.firestore().collection('Users').doc(user.uid)

// await dbh.set({
// name: name,
// username: username,
// email: email
// })

// props.navigation.navigate("Home")

console.log()


}




function deleteAccount(){


}

// function deleteAccount(){//also deletes data under their user id from firestore
// var user = firebase.auth().currentUser;


// const dbh = firebase.firestore().collection('Users').doc(user.uid)
// dbh.delete()

// user.delete().then(function() {
//   // User deleted.


// }, function(error) {
//   // An error happened.
// });
// props.navigation.navigate("Login")}



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
          onChangeText={name => setName(name)}
        />

        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="username"
          placeholderTextColor={colors.text}
          onChangeText={username => setUsername(username)}
        />
 
        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="email"
          placeholderTextColor={colors.text}
          onChangeText={email => setEmail(email)}
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
        title="Update profile information" onPress={() => {createTwoButtonAlertForUpdate(); props.navigation.navigate("Home")}}
        />
        <Button
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                title="Delete Account" onPress={() => createTwoButtonAlertForDelete()}
                />
     </View>
     </View>
    </View>
  );
};

export default EditAccount;