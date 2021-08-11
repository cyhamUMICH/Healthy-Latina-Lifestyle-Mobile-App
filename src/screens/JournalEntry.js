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

const JournalEntry = ({route}, props) => {
    const [text, setText] = useState('');
    const item = route.params;

    const formComplete = () => {
      return text;
    };

    const submit = async () => {

      console.log("HERE LOOK!" + item.contentID);
      console.log("USER!" + route);

      if(formComplete()){
        const dbh = firebase.firestore();
        const docRef = await dbh.collection("journalEntry").add({
          text: text,
          journalPrompt: "journalPrompt" + contentID,
          dateAdded: new Date()
        });

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

          <View
          style={{
              marginTop: '15%',
              marginBottom: '8%',
              bottom: 100,
             }}>
          <Text>{item.description}</Text>
          
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
            placeholder="Journal Entry goes here"
            onChangeText={text => setText(text)}
            defaultValue={text}
          />

    

          
      
          </View>

          <Button
          title="Save"
          onPress={()=>{submit()}}
          />
          



    
      </View>
    );
  };
  
  export default JournalEntry;