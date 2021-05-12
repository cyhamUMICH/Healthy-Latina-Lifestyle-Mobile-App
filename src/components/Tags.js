import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';

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

  let topicTags = props.topics.sort().map((topic, index) => <Text key={index} style={styles.topicTag}>{topic}</Text>);
  
  return (
    <View style={styles.tags}>
      { difficulty != "" ? <Text style={styles.difficultyTag}>{difficulty}</Text> : null }
      { topicTags }
    </View>
  );
};

export default Tags;