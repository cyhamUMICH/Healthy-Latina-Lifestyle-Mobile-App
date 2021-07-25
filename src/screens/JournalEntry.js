import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const JournalEntry = (props) => {

  return (
    <View style={styles.app}>
        <Text> Journal Entry will be viewed here</Text>
    
    </View>
  );
};

export default JournalEntry;