import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { styles } from '../styles/Styles';
import firebase, { auth } from 'firebase';
import { Button } from 'react-native-elements';
import 'firebase/firestore';
import 'firebase/storage';


const ChatRoomHome =(props)=> {
  const [threads, setThreads] = useState([]);
  const [usersGroups, setUserGroups] = useState([]);
  const [finalGroups, setFinalGroups] = useState([]);
  const [index, setIndex] = useState(0);
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))}




async function CreateRoom(){
var user = firebase.auth().currentUser;
var docID;
await firebase.firestore().collection("Groups").add({
name: 'Room ' + threads.length,
message:'default'
})
.then(docRef => docID = docRef.id);
await firebase.firestore().collection("Users").doc(user.uid).set({
GroupID:firebase.firestore.FieldValue.arrayUnion(docID)
}, {merge:true});
}
//right now it grabs all the groups. i need to figure out how to seperate to ones only had by the user
//im thinking by grabbing the array from the user, i can delete any entry from the threads array that arent in my users array
async function compareArrays(){
console.log("enter comapre");
var indexSmall = 0;
var stuff = [];
console.log(usersGroups.length);
if(threads.length > 0)
{
//let index = 0;
  for(let i = 0; i< threads.length; i++)
  {
  console.log("entered first loop");
        for(let j = 0; j < usersGroups.length; i++)
        {
        console.log("enter second loop");

        if((threads.map(x=>x._id)[i]) === usersGroups[j])
        {

        stuff[indexSmall] = (threads.map(x=>x._id)[i]);
        //console.log(finalGroups[index]);
        console.log("enter if");
        indexSmall++;
        }
        }
        }
  }
  else if(threads.length === 0)
  {
  }
  //console.log("final groups");
  //console.log(finalGroups);
  setFinalGroups(stuff);
  setIndex(index+1);
  }


async function loadUserRooms()
    {
   var user =  await firebase.auth().currentUser
   //console.log("oof");

     await firebase.firestore().collection('Users').doc(user.uid).get()
    .then((documentSnapshot) =>{
     const stuff = getGroups(documentSnapshot);
    setUserGroups(stuff);
    //console.log(usersGroups[0]);
    });
    compareArrays();
    }
     function getGroups(documentSnapshot){
                return documentSnapshot.get('GroupID');

                }


  useEffect(() => {


    const unsubscribe =
    firebase.firestore()
      .collection('Groups')
      .onSnapshot((querySnapshot) => {
        const stuff = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),

          };
        });

        setThreads(stuff);
        if(threads.length>0)
        {
        loadUserRooms();
        }
        else
        {
        setIndex(index+1);
        }
       console.log("entered page");
      });



    /**
     * unsubscribe listener
     */

     return() => unsubscribe(); //compareArrays();





  }, []);


return(
<View style={styles.container}>
  <FlatList
    data={threads}
    keyExtractor={(item) => item._id}
    ItemSeparatorComponent={() => <Divider />}
    renderItem={({ item }) => (

      <TouchableOpacity
      onPress= {() => props.navigation.navigate("ChatScreen", {thread:item})}
      >
      <List.Item
        title={item.name}
        //description='Item description'
        titleNumberOfLines={1}
        titleStyle={styles.listTitle}
        //descriptionStyle={styles.listDescription}
        //descriptionNumberOfLines={1}
      />
      </TouchableOpacity>
    )}
  />
  <View>
  <Button
                        buttonStyle={styles.button}
                        titleStyle={styles.buttonText}
                        title="Create Room" onPress={() => CreateRoom()}
                        />
             </View>
</View>

);
  // ...rest of the component
}
export default ChatRoomHome;