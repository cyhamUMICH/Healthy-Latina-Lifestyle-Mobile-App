import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';
import * as firebase from 'firebase/app';
import { Alert } from 'react-native';
import "firebase/firestore";
import "firebase/storage";
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
        "Saved",
        "The Journal Entry has saved successfully.",
        [
          {
            text: "OK"
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
            <SetFeatured firebaseCollectionName="journalPrompts" item={item} />
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
              onPress={()=>{findIfNull(props)}}/>
          </View>
        </View>
      </View>
    );
  };
  
  export default JournalEntry;