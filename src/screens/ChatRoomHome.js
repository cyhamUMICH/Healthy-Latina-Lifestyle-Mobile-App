import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { List, Divider } from 'react-native-paper';
import LoadingSpinner from '../components/LoadingSpinner';
import { styles } from '../styles/Styles';
import firebase from 'firebase';
import { Alert } from 'react-native';
import { Button } from 'react-native-elements';
import Clipboard from '@react-native-community/clipboard';
import 'firebase/firestore';
import 'firebase/storage';

const ChatRoomHome =(props)=> {
  const [threads, setThreads] = useState([]);
  const [usersGroups, setUsersGroups] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const askCopyOrDelete = (item) => {
    Alert.alert(
      "",
      "Would you like to leave this room or copy the group code?",
      [
        { text: "Leave Room", onPress: () => createTwoButtonAlertForDelete(item) },
        { text: "Copy Group Code", 
          style: 'cancel',onPress: () => Clipboard.setString(item._id) }
      ],
      { cancelable: true }
    );
  };

  const createTwoButtonAlertForDelete = (item) => {
    Alert.alert(
      "Leave Room",
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
  };

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

  useEffect(() => { 
    fetchRooms();
  }, [usersGroups]);

  return(
    <View style={styles.app}>
      { isLoaded ?
        <View style={styles.fullWidthWindow}>
          <View>
            <FlatList
              data={threads}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={() => <Divider />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress= {() => props.navigation.navigate("ChatScreen", {
                    thread: item,
                    navigation: props.navigation
                  })}
                  onLongPress = {() => askCopyOrDelete(item)}
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
          <View style = {styles.smallerWidthWindow}>
            <View style = {styles.chatHorizontalLayout}>
              <Button
                containerStyle={styles.chatButtonContainer}
                buttonStyle={styles.chatButton}
                titleStyle={styles.buttonText}
                title="Create Room" onPress={() => props.navigation.navigate("CreateRoom")}
                />

              <Button
                containerStyle={styles.chatButtonContainer}
                buttonStyle={styles.chatButton}
                titleStyle={styles.buttonText}
                title="Join Room" onPress={() => props.navigation.navigate("JoinRoom")}
                />
            </View>
          </View>
      </View>
      : <LoadingSpinner />
    }
  </View>
  );
}
export default ChatRoomHome;