import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const Journal = (props) => {

  return (
    <View style={styles.app}>
        <Text>Journal Prompts will be here</Text>
        <Button
        title="After you picked prompt press here"
        onPress={() => {props.navigation.navigate("JournalEntry")}}></Button>
  
    </View>
  );
};

export default Journal;