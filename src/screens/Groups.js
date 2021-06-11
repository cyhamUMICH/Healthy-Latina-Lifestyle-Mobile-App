import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { Button } from 'react-native-elements';
import { Image } from 'react-native';
import { Alert } from 'react-native';
import { Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';


const Groups = (props) => {

const [name, setName] = useState('default');
const [groupID, setGroupID] = useState('');
const [newMessage, setNewMessage] = useState('');
const [message, setMessage] = useState('empty');

useEffect(() =>{
    const loadData = async () =>{//loads group id
    var user = firebase.auth().currentUser
    await firebase.firestore().collection('Users').doc(user.uid).get()
    .then(documentSnapshot => getGroupID(documentSnapshot))
    .then(name => setName(name))

    }

    const loadMessage = async () =>{//loads group id

        await firebase.firestore().collection('Groups').doc(name).get()
        .then(documentSnapshot => getMessage(documentSnapshot))
        .then(message => setMessage(message))

        }

    const getGroupID = (documentSnapshot) =>{
    return documentSnapshot.get('GroupID');

    }
     const getMessage= (documentSnapshot) =>{
        return documentSnapshot.get('message');
        }


loadData();
loadMessage();
})

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

async function updateNewMessage(){
var user = firebase.auth().currentUser

console.log(user.uid)


const dbh = firebase.firestore().collection('Groups').doc(name)

await dbh.set({
message: newMessage,
})
props.navigation.navigate("Home")


}

async function updateGroupID(){

var user = firebase.auth().currentUser

console.log(user.uid)


const dbh = firebase.firestore().collection('Users').doc(user.uid)

await dbh.set({
GroupID: groupID,
}, {merge:true});

const dbh2 = firebase.firestore().collection('Groups').doc(groupID)

await dbh2.set({
}, {merge:true});
props.navigation.navigate("Home")

}



  return (
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
      <View style={styles.smallerWidthWindow}>

      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          textAlign="center"
          placeholder="GroupID"
          placeholderTextColor={colors.text}
          onChangeText={groupID => setGroupID(groupID)}
        />
      </View>

      <Button
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Change Group" onPress={() => updateGroupID() }
        />
        <Button
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
                title="Chat SCreen" onPress={() => props.navigation.navigate("ChatScreen") }
                />

<Text> GroupID: {name} </Text>
<Text> Message: {message} </Text>

     </View>
     </View>
     <View style={styles.fullWidthWindow}>
           <View style={styles.smallerWidthWindow}>
           <View style={styles.inputView}>

                   <TextInput
                     style={styles.inputText}
                     textAlign="center"
                     placeholder="New Message"
                     placeholderTextColor={colors.text}
                     onChangeText={newMessage => setNewMessage(newMessage)}
                   />
                 </View>

                 <Button
                   buttonStyle={styles.button}
                   titleStyle={styles.buttonText}
                   title="Change Message" onPress={() => updateNewMessage() }
                   />


           </View>
                </View>

    </View>
  );
};

export default Groups;