import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import { Alert } from 'react-native';
import "firebase/firestore";
import "firebase/storage";
import { color } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';
import SetFeatured from '../components/SetFeatured';

const JournalEntry = ({route}, props) => {
    const [text, setText] = useState();
    const item = route.params;


    const formComplete = () => {
      return text;
    };

    const findIfNull = async (props) => {

      if(item.description == null){
       submitWithoutPrompt(props)
      }
      else{
        submitWithPrompt(props)
      }
    
    };

    const saveMessage = async (props) => {

      Alert.alert(
        "Save",
        "Journal Entry is saved",
        [
          {
            text: "OK",
            onPress: () => {props.navigation.navigate("Home")}
          }
        ]
      );
    };


    const submitWithoutPrompt = async (props) => {

        const dbh = firebase.firestore();
        const docRef = dbh.collection('journalPrompts').doc("undefined");
        const doc = await docRef.get();

        var user = firebase.auth().currentUser;
    
          if(formComplete()){
            const dbh = firebase.firestore();
            await dbh.collection("journalEntry").add({
              theText: text,
              dateEntryAdded: new Date(),
              dateEntryEdited: new Date(),
              journalPromptTitle: " ", 
              journalPromptDesc: " ",
              userID: user.uid,
              journalPromptID: doc.id,
            });
            const userRef = dbh.collection('Users').doc(user.uid);
            const userDoc = await userRef.get();
            const num = userDoc.data().journalEntryNum;
            await userRef.update({journalEntryNum: num+1})
            saveMessage(props)
          }
          else{
            Alert.alert(
              "Empty Journal Entry",
              "Please complete enter text before submitting.",
              [
                {text: "OK"}
              ]
            );
          }


    };

    const submitWithPrompt = async (props) => {

        const dbh = firebase.firestore();

        const docRef = dbh.collection('journalPrompts').doc(item.contentID);
        const doc = await docRef.get();

        var user = firebase.auth().currentUser;

          if(formComplete()){
            const dbh = firebase.firestore();
            await dbh.collection("journalEntry").add({
              theText: text,
              dateEntryAdded: new Date(),
              dateEntryEdited: new Date(),
              journalPromptTitle: doc.data().title, 
              journalPromptDesc: doc.data().description,
              userID: user.uid,
              journalPromptID: doc.id,
            });

            const userRef = dbh.collection('Users').doc(user.uid);
            const userDoc = await userRef.get();
            const num = userDoc.data().journalEntryNum;
            await userRef.update({journalEntryNum: num+1})
            saveMessage(props)

          }
          else{
            Alert.alert(
              "Empty Journal Entry",
              "Please complete enter text before submitting.",
              [
                {text: "OK"}
              ]
            );
          }

    };

    

    return (
      <View style={styles.app}>
          <View style={styles.journalTitles} >
            <Text style={styles.journalCardTitle}>
              {item.title}
            </Text>    
            <Text style={styles.journalCardDesc}>
                {item.description}
            </Text>
          </View>
          <SetFeatured firebaseCollectionName="journalPrompts" item={item} />
          <View style={styles.journalEntrySpace} >
          <TextInput
            multiline={true}
            style={{height: 40}, {fontSize: 20}, {width: 400}}
            placeholder="Journal Entry goes here"
            onChangeText={input => setText(input)}/>
          </View>
          <Button
          title="Save"
          onPress={()=>{findIfNull(props)}}/>
      </View>
    );
  };
  
  export default JournalEntry;