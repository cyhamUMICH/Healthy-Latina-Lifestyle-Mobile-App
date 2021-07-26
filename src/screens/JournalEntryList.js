import React, { useEffect, useState } from 'react';
import { View, Text, Button} from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const JournalEntryList = (props) => {

  return (
    <View style={styles.app}>
        <Text> List of Journal Entries will be stored here</Text>

        <Button
        title="You can edit an entry"
        onPress={()=>{props.navigation.navigate("JournalEntry")}}/>

    
    </View>
  );
};

export default JournalEntryList;