import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import LoadingSpinner from '../components/LoadingSpinner';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors'

import { Alert } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import 'firebase/firestore';
import 'firebase/storage';

const JoinRoom =(props)=> {

const[code, setCode] = useState('');

function createOneButtonAlertForChatMax(){
Alert.alert(
      "Group Maximum Reached",
      "You are cxurrently at the max allowed chat rooms per user (10). Please Leave a chat room to join another",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
}
function createOneButtonAlertForChatNotExist(){
Alert.alert(
      "Group Does not exist",
      "That Group ID does not exist. Make sure you're entering the correct Information",
      [
        { text: "OK"}
      ],
      { cancelable: true }
    );
}

async function realRoom()
{
const dbh = firebase.firestore();
await dbh.collection("Groups").doc(code).get()
.then((doc) =>{
    if(doc.exists){
    return true;
    }
    else
    {createOneButtonAlertForChatNotExist()}
    })
}

async function joinRoom(){

var room = false;
room = await realRoom();
if(room)
{
var bool = false;
 const dbh = firebase.firestore();
    await dbh.collection("Users").doc(firebase.auth().currentUser.uid).get()
    .then((doc) => {
      if (doc.exists) {
        if (!doc.data().GroupID || doc.data().GroupID.length <= 10) {
          bool = true;
        }
      }
      })
if(bool){
var user = firebase.auth().currentUser;
const dbh = firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid)
await dbh.set({
GroupID: firebase.firestore.FieldValue.arrayUnion(code)
}, {merge:true});

props.navigation.navigate("Home")
}
else if (!bool)
{
createOneButtonAlertForChatMax();
}
}
}

return(
    <View style={styles.app}>
    <View style={styles.fullWidthWindow}>
    <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              textAlign="center"
              placeholder="Room Code"
              placeholderTextColor={colors.text}
              onChangeText={code => setCode(code)}
            />
            </View>
             <Button
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    title="Join Room"  onPress={() => joinRoom()}
                    />
     </View>
     </View>
  );
}
export default JoinRoom;