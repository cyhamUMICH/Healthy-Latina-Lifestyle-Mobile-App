import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { styles } from '../styles/Styles';
import FilterModal from '../components/ContentFilter';

const ContentCards = (props) => {
  return (
    (props.filteredList.length != 0) 
    ? <FlatList 
        style={props.style}
        data={props.filteredList}
        renderItem={ContentCard}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
  );
};

const ContentCard = ({item}) => {
  // Convert seconds to HH:MM:SS, then remove HH if 00
  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript
  let duration = new Date(item.duration * 1000).toISOString().substr(11, 8);
  duration = (duration.substr(0, 2) == "00") ? duration.substr(3) : duration;

  return (
    <Card containerStyle={styles.card}>
      <Card.Image source={item.imagePath} style={styles.cardImage}>
        <Text style={styles.duration}>{duration}</Text>
      </Card.Image>
      <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
      <Card.Divider/>
      <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
    </Card>
  );
};

const Tags = (props) => {
  let difficulty;
  switch (props.difficulty) {
    case "B":
      difficulty = "Beginner";
      break;
    case "A": 
      difficulty = "Advanced";
      break;
    default:
      difficulty = "";
  }

  let topics = props.topics.split(",");
  let topicTags = topics.sort().map((topic, index) => <Text key={index} style={styles.topicTag}>{topic}</Text>);
  
  return (
    <View style={styles.tags}>
      { difficulty != "" ? <Text style={styles.difficultyTag}>{difficulty}</Text> : null }
      { topicTags }
    </View>
  );
};

const ContentList = (props) => {
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
        filteredList={filteredList}/>
      <FilterModal
        allData={props.data}
        filterBy={filterBy}
        visibleFunction={setFilterModalVisible}
        visible={filterModalVisible}
        filterSettingsFunction={setFilterSettings}
        filterSettings={filterSettings}
        filteredListFunction={setFilteredList}
        filteredList={filteredList}/>
    </View>
  );
};

export default ContentList;