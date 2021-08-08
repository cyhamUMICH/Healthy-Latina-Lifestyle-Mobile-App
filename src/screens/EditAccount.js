import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const EditAccount = (props) => {

const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [username, setUsername] = useState('');

const [oldName, setOldName] = useState('');
const [oldEmail, setOldEmail] = useState('');
const [oldUsername, setOldUsername] = useState('');



useEffect(() =>{
    const loadOldName = async () =>{
    var user = firebase.auth().currentUser
    await firebase.firestore().collection('Users').doc(user.uid).get()
    .then(documentSnapshot => getName(documentSnapshot))
    .then(oldName => setOldName(oldName))

    }

    const loadOldUsername = async () =>{

        var user = firebase.auth().currentUser
            await firebase.firestore().collection('Users').doc(user.uid).get()
            .then(documentSnapshot => getUsername(documentSnapshot))
            .then(oldUsername => setOldUsername(oldUsername))

        }

    const loadOldEmail = async () =>{
               var user = firebase.auth().currentUser
                await firebase.firestore().collection('Users').doc(user.uid).get()
                .then(documentSnapshot => getEmail(documentSnapshot))
                .then(oldEmail => setOldEmail(oldEmail))
              }

    const getName = (documentSnapshot) =>{
    return documentSnapshot.get('name');

    }
     const getEmail= (documentSnapshot) =>{
        return documentSnapshot.get('email');
        }

const getUsername= (documentSnapshot) =>{
        return documentSnapshot.get('username');
        }

loadOldEmail();
loadOldName();
loadOldUsername();
})

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

async function checkUsername(user)
{
var temp = true;
const load =async  (user)=>{//loads email from a given username


    await firebase.firestore().collection('Users').where('username', '==', user).get()
            .then(querySnapshot => {
                if (querySnapshot.size > 0) {
                temp = false;//this means that it is taken
                }
             })
    }
await load(user);
return temp;
}

function createTwoButtonAlertForUpdate(){
Alert.alert(
      "Update Account",
      "This will update all populated fields above. Are you sure?",
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

function createOneButtonAlertForUnableToUpdateUsername(){
Alert.alert(
      "Username Already Taken",
      "Your desired username is already taken. Your Username was NOT updated",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
}


function  checkValues(){
 if(name === "")
        {
        name => setName(oldName);
        }
        if(username)
        {
        username => setUsername(oldUsername);
        }
        if(email)
        {
        email => setEmail(oldEmail);
        }
        }



async function updateProfile(){

var user = firebase.auth().currentUser

console.log(user.uid)

var aName = name;
var aEmail = email;
var aUsername = username;
 if(aName === "")
 {
 aName = oldName;
 }
 if(aEmail === "")
 {
 aEmail = oldEmail;
 }
 if(aUsername === "")
 {
 aUsername = oldUsername;
 }
 else
 {
 const check = await checkUsername(aUsername);
    if(!check && aUsername != oldUsername)
    {
    aUsername =oldUsername;
    createOneButtonAlertForUnableToUpdateUsername();
    }
 }

//await checkValues();

const dbh = firebase.firestore().collection('Users').doc(user.uid)

await dbh.set({
name: aName,
username: aUsername,
email: aEmail
}, {merge:true});
user.updateEmail(aEmail);
user.updateProfile({
  displayName:aUsername
  });

props.navigation.navigate("Home", { navigation: props.navigation })

}


function deleteAccount(){//also deletes data under their user id from firestore
var user = firebase.auth().currentUser;


const dbh = firebase.firestore().collection('Users').doc(user.uid)
dbh.delete()

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
        title="Update profile information" onPress={() => {createTwoButtonAlertForUpdate(); props.navigation.navigate("Home", { navigation: props.navigation })}}
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