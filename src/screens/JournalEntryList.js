import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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
    
    </View>
  );
};

export default JournalEntryList;