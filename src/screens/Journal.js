import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const Journal = (props) => {

  return (
    <View style={styles.app}>
        <Text>Journal Prompts and writing space will be here</Text>
    
    </View>
  );
};

export default Journal;