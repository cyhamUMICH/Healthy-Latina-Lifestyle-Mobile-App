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
import { func } from 'prop-types';


const SavedEntry = ({route}, item) => {



    const theItem = route.params;
    let theEntry = "";

    const dbh = firebase.firestore();

  
        dbh
        .collection('journalEntry')
        .get()
        .then(snapshot => {
          snapshot
            .docs
            .forEach(doc => {
              if(doc.id == theItem.contentID){
                console.log(doc.data().theText) 
              }
            });
        });
     
    

    return (
      <View style={styles.app}>

          <View
          style={{
              marginTop: '15%',
              marginBottom: '8%',
              bottom: 100,
             }}>
          <Text>{theItem.journalPromptTitle}</Text>
          <Text>{theItem.journalPromptDesc}</Text>
          
          
         
      
          </View>


        

          <View
          style={{ 
            backgroundColor: colors.journalTextBackground, 
            borderBottomColor: '#CCCCCC',  
            borderTopColor: '#CCCCCC',
            borderLeftColor: '#CCCCCC',
            borderRightColor: '#CCCCCC',
            borderBottomWidth: 1, 
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            bottom:50,
            height: 500
           }}  
           >
       
          <TextInput
            multiline={true}
            numberOfLines={3}
            style={{height: 40}, {fontSize: 20}, {width: 400}}
            // placeholder="Journal Entry goes here"
            // onChangeText={text => setText(text)}
            defaultValue={theEntry}
          />

         


          </View>

          
      </View>
    );
  };


  export default SavedEntry;