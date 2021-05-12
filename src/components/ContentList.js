import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { styles } from '../styles/Styles';
import FilterModal from '../components/ContentFilter';
import Tags from '../components/Tags';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";

const ContentCards = (props) => {
  return (
    (props.filteredList.length != 0) 
    ? <FlatList 
        style={props.style}
        data={props.filteredList}
        renderItem={(item) => ContentCard(item, props.contentComponent, props.navigation)}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
  );
};

const ContentCard = ({item}, contentComponent, navigation) => {
  // Convert seconds to HH:MM:SS, then remove HH if 00
  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
  let duration = new Date(item.duration * 1000).toISOString().substr(11, 8);
  duration = (duration.substr(0, 2) == "00") ? duration.substr(3) : duration;

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => {navigation.navigate(contentComponent, item)}}>
      <Card containerStyle={styles.card}>
        <Card.Image source={{ uri: item.imagePath }}
          style={styles.cardImage}>
          <Text style={styles.duration}>{duration}</Text>
        </Card.Image>
        <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
        <Card.Divider/>
        <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
      </Card>
    </TouchableOpacity>
  );
};

const ContentList = (props) => {
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  useEffect(() => {
    const fetchTopicsList = async () => {
      const dbh = firebase.firestore();
      dbh.collection("topics").get()
      .then((querySnapshot) => {

        if (querySnapshot.size == 0) {
          setIsTopicsLoaded(true);
        }
        else {
          let countTopics = 0;
          querySnapshot.forEach((doc) => {
            // Add to the topic list
            setTopicsList(oldList => [...oldList, doc.data().name]);
            countTopics++;

            // Data is loaded once all topics are in the list
            if (querySnapshot.size === countTopics) {
              setIsTopicsLoaded(true);
            }
          })
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    };
  
    fetchTopicsList();  
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
      <Button 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        title="Filter"
        onPress={() => {
          setFilterModalVisible(true);
        }}></Button>
      <ContentCards 
        style={styles.cardList} 
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
    : <LoadingSpinner />
  );
};

export default ContentList;