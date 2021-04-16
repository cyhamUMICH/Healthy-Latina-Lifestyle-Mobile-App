import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { styles } from '../styles/Styles';

const ContentCards = (props) => {
  return (
    <View>
    {
      (props.filteredList.length != 0) 
      ? <FlatList 
          style={props.style}
          data={props.filteredList}
          renderItem={ContentCard}
          keyExtractor={item => item.contentID} /> 
      : <Text>No {props.contentType} Match Your Search</Text>
    }
    </View>
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
  let topicTags = topics.map((topic, index) => <Text key={index} style={styles.topicTag}>{topic}</Text>);
  
  return (
    <View style={styles.tags}>
      { difficulty != "" ? <Text style={styles.difficultyTag}>{difficulty}</Text> : null }
      { topicTags }
    </View>
  );
};

const ContentList = (props) => {
  return (
    <View>         
      <View style={styles.fullWidthWindow}>
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          title="Filter"
          onPress={() => {}}></Button>
        <ContentCards 
          style={styles.cardList} 
          contentType={props.contentType}
          filteredList={props.data}/>
      </View>
    </View>
  );
};

export default ContentList;