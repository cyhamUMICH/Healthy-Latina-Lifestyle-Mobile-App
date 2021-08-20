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
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';

const SavedEntry = ({route}, item) => {

    const [entryText, setEntryText] = useState('');
    const [text, setText] = useState('');
    const [isEditable, setIsEditable] = useState(false);


    const theItem = route.params;
    const dbh = firebase.firestore();

    const findIfNull = async () => {

      const myRef = dbh.collection('journalEntry').doc(theItem.contentID);
      await myRef.update({theText: text})
      await myRef.update({dateEntryEdited: new Date()})

    };


    dbh
    .collection('journalEntry')
    .get()
    .then(snapshot => {
      snapshot
        .docs
        .forEach(doc => {
          if(doc.id == theItem.contentID){
            console.log(doc.data().theText) 
            setEntryText(doc.data().theText)
          }
        });
    });
     
    

    return (
      <View style={styles.app}>

        <View style={styles.journalTitles}>
      
            <Text style={styles.journalCardTitle}>
                {theItem.journalPromptTitle}
            </Text>  

            <Text style={styles.journalCardDesc}>
                {theItem.journalPromptDesc}
            </Text>

            <Text style={styles.journalCardDesc}> 
              {"Last edited: " + theItem.dateEntryEdited.toDate().toString().slice(4, 15)} 
            </Text>
          
          </View>

          <View style={styles.journalEntrySpace}>
       
          <TextInput
            multiline={true}
            editable={isEditable}
            numberOfLines={3}
            style={{height: 40}, {fontSize: 20}, {width: 400}}
            // placeholder="Journal Entry goes here"
            onChangeText={input => setText(input)}
            defaultValue={entryText}
          />
          </View>

          <View style={styles.horizontalButtonLayout}>

            <Button
              disabled={isEditable}
              title="Edit"
              onPress={()=>{setIsEditable(true)}}
            />

            <Button
              disabled={!isEditable}
              title="Save"
              onPress={()=>{findIfNull(), setIsEditable(false)}}
            />

          </View> 


      </View>
    );
  };


  export default SavedEntry;