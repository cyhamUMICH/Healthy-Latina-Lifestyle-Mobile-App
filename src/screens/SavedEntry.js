import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import { ScrollView } from 'react-native-gesture-handler';

const SavedEntry = ({route}) => {

    const [text, setText] = useState('');
    const [isEditable, setIsEditable] = useState(false);


    const theItem = route.params.item;
    const navigation = route.params.navigation;

    const findIfNull = async () => {
      const dbh = firebase.firestore();
      const myRef = dbh.collection('journalEntry').doc(theItem.contentID);
      await myRef.update({theText: text})
      await myRef.update({dateEntryEdited: new Date()})

      // Refresh entry list to update the saved entry and move it to the top
      navigation.replace("JournalEntryList");
    };

    useEffect(() => {
      setText(theItem.theText)
    }, []);

    return (
        <View style={styles.app}>
        <View style={styles.fullWidthWindow}>
          <View style={styles.floatingActionView}>
            <ScrollView style={styles.journalTitles}>
              <Text style={styles.journalTitle}>
                  {theItem.journalPromptTitle}
              </Text> 
              <Text style={styles.journalDesc}>
                  {theItem.journalPromptDesc}
              </Text>
              <Text style={styles.journalDesc}> 
                    {"Last edited: " + theItem.dateEntryEdited.toDate().toString().slice(4, 15)} 
               </Text>
            </ScrollView>
            <View style={styles.journalEntrySpace}>
                <TextInput
                multiline={true}
                editable={isEditable}
                numberOfLines={3}
                style={styles.journalEntryTextInput}
                value={text}
                onChangeText={input => setText(input)}
              />
            </View>
        <View style={styles.horizontalButtonLayout}>
            <Button
              containerStyle={styles.journalButtonContainerStyle}
              buttonStyle={styles.emptyJournalButton}
              titleStyle={styles.buttonText}
              disabled={isEditable}
              title="Edit"
              onPress={()=>{setIsEditable(true)}}
            />
            <Button
              containerStyle={styles.journalButtonContainerStyle}
              buttonStyle={styles.emptyJournalButton}
              titleStyle={styles.buttonText}
              disabled={!isEditable}
              title="Save"
              onPress={()=>{findIfNull(), setIsEditable(false)}}
            />
          </View> 
          </View>
        </View>
        </View>
    );
  };


  export default SavedEntry;