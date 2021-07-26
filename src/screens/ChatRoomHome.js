import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import LoadingSpinner from '../components/LoadingSpinner';
import { styles } from '../styles/Styles';
import firebase from 'firebase';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import 'firebase/firestore';
import 'firebase/storage';

const ChatRoomHome =(props)=> {
  const [threads, setThreads] = useState([]);
  const [usersGroups, setUsersGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

function createTwoButtonAlertForDelete(item){
Alert.alert(
      "Delete Room",
      "This will remove you from the selected chat room. You can rejoin later if you have the room code",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteChat(item) }
      ],
      { cancelable: true }
    );
}

async function deleteChat(item){
var id = item._id;

const dbh = firebase.firestore();
await dbh.collection("Users").doc(firebase.auth().currentUser.uid).update({
GroupID: firebase.firestore.FieldValue.arrayRemove(id)
}
);
setUsersGroups([]);
}
  const fetchUsersGroups = async () => {
    const dbh = firebase.firestore();
    dbh.collection("Users").doc(firebase.auth().currentUser.uid).get()
    .then((doc) => {
      if (doc.exists) {
        if (!doc.data().GroupID || doc.data().GroupID.length == 0) {
          setIsLoaded(true);
        }
        else {
          setUsersGroups(doc.data().GroupID);
        }
      } 
      else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  };

  const fetchRooms = async () => {
    if (usersGroups.length == 0) {
      fetchUsersGroups();
    }
    else
    {
      const dbh = firebase.firestore();
      // Code from: https://stackoverflow.com/questions/62524946/firestore-check-if-id-exists-against-an-array-of-ids
      dbh.collection("Groups").where(firebase.firestore.FieldPath.documentId(), "in", usersGroups)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let tempGroupsArray = [];
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc._id = doc.id;
            tempGroupsArray.push(newDoc);
          });
          setThreads(tempGroupsArray);
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
      .finally(() => {
        setIsLoaded(true);
      });
    }
  };

  /*async function CreateRoom() {
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

    // Update usersGroups to be empty, so the new group will appear on the list.
    // Changing usersGroups will trigger useEffect, so fetchRooms will be called.
    // This function calls fetchUsersGroups when usersGroups is empty which will update the list.
    setIsLoaded(false);
    setUsersGroups([]);
  }
*/
  useEffect(() => { 
    fetchRooms();
  }, [usersGroups]);

  return(
    <View style={styles.app}>
    <View style={styles.fullWidthWindow}>
      { isLoaded ?
        <View>
          <FlatList
            data={threads}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({ item }) => (

              <TouchableOpacity
              onPress= {() => props.navigation.navigate("ChatScreen", {
                thread: item
              })}
              onLongPress = {() => createTwoButtonAlertForDelete(item)}
              >
              <List.Item
                title={item.name}
                description= {"Group Code: " + item._id}
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
              />
              </TouchableOpacity>
            )}
          />
        </View>
      : <LoadingSpinner />
      }

                   </View>
      <View style = {styles.smallerWidthWindow}>
      <View style = {styles.chatHorizontalLayout}>
                <Button
                  buttonStyle={styles.chatButton}
                  titleStyle={styles.buttonText}
                  title="Create Room" onPress={() => props.navigation.navigate("CreateRoom")}
                  />

                     <Button
                      buttonStyle={styles.chatButton}
                      titleStyle={styles.buttonText}
                      title="Join Room" onPress={() => props.navigation.navigate("JoinRoom")}
                      />
                   </View>
                   </View>
      </View>
  );
  // ...rest of the component
}
export default ChatRoomHome;