import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';
import * as firebase from 'firebase/app';
import { Alert } from 'react-native';
import "firebase/firestore";
import "firebase/storage";
import SetFeatured from '../components/SetFeatured';

const JournalEntry = ({route}) => {
    const [text, setText] = useState();
    const {item, navigation } = route.params;


    const formComplete = () => {
      return text;
    };

    const findIfNull = async () => {

      if(item.description == null){
       submitWithoutPrompt()
      }
      else{
        submitWithPrompt()
      }
    
    };

    const saveMessage = async () => {

      Alert.alert(
        "Saved",
        "The Journal Entry has saved successfully.",
        [
          {
            text: "OK",
            style: 'cancel'
          }
        ]
      );

      navigation.pop();
    };


    const submitWithoutPrompt = async () => {

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
            saveMessage()
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

    const submitWithPrompt = async () => {

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
            saveMessage()
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
        <View style={styles.fullWidthWindow}>
          <View style={styles.floatingActionView}>
            <ScrollView style={styles.journalTitles} >
              <Text style={styles.journalTitle}>
                {item.title}
              </Text>    
              <Text style={styles.journalDesc}>
                {item.description}
              </Text>
            </ScrollView>
            {item.title !== "" ? 
              <SetFeatured firebaseCollectionName="journalPrompts" item={item} />
              :
              null
            }
            <View style={styles.journalEntrySpace} >
              <TextInput
                multiline={true}
                style={styles.journalEntryTextInput}
                placeholder="Write your thoughts here..."
                onChangeText={input => setText(input)}/>
            </View>
            <Button
              title="Save"
              buttonStyle={styles.button}
              titleStyle={styles.buttonText}
              onPress={()=>{findIfNull()}}/>
          </View>
        </View>
      </View>
    );
  };
  
  export default JournalEntry;