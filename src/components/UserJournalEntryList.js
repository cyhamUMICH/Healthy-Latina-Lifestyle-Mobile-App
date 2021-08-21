import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { GetTopics } from '../components/GetTopics';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const UserJournalEntryCards = (props) => {

  return (
    (props.filteredList.length != 0) 
    ? <FlatList 
        style={props.style}
        data={props.filteredList}
        renderItem={(item) => UserJournalEntryCard(item, props.contentComponent, props.navigation)}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>You have no journal entries.</Text>
  );
};


const deleteEntry = async (item, navigation) => {

    const dbh = firebase.firestore();
    await dbh.collection('journalEntry').doc(item.contentID).delete();


    Alert.alert(
      "Journal entry is deleted"
    );

    navigation.navigate("Home");

}

const deleteButton = async (item, navigation) => {

Alert.alert(
  "Are you sure you want to delete this journal entry?",
  "This action cannot be undone.",
  [
    {
      text: "No"
    },
    {
      text: "Yes",
      onPress: () => {deleteEntry(item, navigation)}
    }
  ]
);

}

const UserJournalEntryCard = ({item}, contentComponent, navigation) => {

  return (
      <Card containerStyle={styles.card}>
        <View style={styles.horizontalButtonLayout}>
          <View>
            <Card.Title style={styles.cardTitle}>{item.journalPromptTitle}</Card.Title>
            <Text style={styles.journalDesc}> {"Created: " + item.dateEntryAdded.toDate().toString().slice(4, 15)} </Text>
            
            <View style={styles.horizontalButtonLayout}>
              <Button title="View"
              buttonStyle={styles.emptyJournalButton}
              titleStyle={styles.buttonText}
              onPress={() => {navigation.navigate("SavedEntry", item)}}>
              </Button>

              <Button title="Delete"
              buttonStyle={styles.emptyJournalButton}
              titleStyle={styles.buttonText}
              onPress={() => {deleteButton(item, navigation)}} >
              </Button>
            </View>

          </View>
        </View>
      </Card>
  ); 
};

const UserJournalEntryList = (props) => {
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [topicsList, setTopicsList] = useState([]);

  useEffect(() => {
    GetTopics(setIsTopicsLoaded, setTopicsList);
  }, []);

  const [filteredList, setFilteredList] = useState(props.data);

  return (
    isTopicsLoaded ? 
    <View style={styles.fullWidthWindow}>
      <View style={styles.floatingActionView}>
       
        <UserJournalEntryCards 
          style={styles.journalCardList} 
          contentType={props.contentType}
          filteredList={filteredList}
          contentComponent={props.contentComponent}
          navigation={props.navigation} />
      </View>
    </View>
    : <LoadingSpinner />
  );
};

export default UserJournalEntryList;