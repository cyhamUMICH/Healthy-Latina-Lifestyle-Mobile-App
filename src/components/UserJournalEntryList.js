import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import FilterModal from '../components/ContentFilter';
import { GetTopics } from '../components/GetTopics';
import Tags from '../components/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import { Drawer } from 'react-native-paper';
import { Groups } from '../screens/Groups';
import defaultImage from '../../assets/logo-icon.png';
import { ScrollView } from 'react-native-gesture-handler';

const UserJournalEntryCards = (props) => {

  return (
    (props.filteredList.length != 0) 
    ? <FlatList 
        style={props.style}
        data={props.filteredList}
        renderItem={(item) => UserJournalEntryCard(item, props.contentComponent, props.navigation)}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
  );
};

const UserJournalEntryCard = ({item}, contentComponent, navigation) => {


  return (
      <Card containerStyle={styles.card}>
        <View style={styles.horizontalButtonLayout}>
          <View>
            <Card.Title style={styles.cardTitle}>{item.journalPromptTitle}</Card.Title>
            <Text style={styles.journalCardDesc}> {"Last edited: " + item.dateEntryAdded.toDate().toString().slice(4, 15)} </Text>
            <Button title="edit"
            onPress={() => {navigation.navigate(contentComponent, item)}}>
            </Button>
            <Button title="delete" >
            </Button>
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
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterSettings, setFilterSettings] = useState({
    difficultyFilter: [],
    languageFilter: [],
    topicFilter: [],
    durationFilter: []
  });
  const filterBy = props.filterBy.split(',');

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
        
        <FilterModal
          allData={props.data}
          topicsList={topicsList}
          filterBy={filterBy}
          visibleFunction={setFilterModalVisible}
          visible={filterModalVisible}
          filterSettingsFunction={setFilterSettings}
          filterSettings={filterSettings}
          filteredListFunction={setFilteredList}
          filteredList={filteredList}/>

        
      </View>
    </View>
    : <LoadingSpinner />
  );
};

export default UserJournalEntryList;