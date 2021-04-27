import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import ContentList from '../components/ContentList';

const MeditationList = () => {
  // TODO: Make data come from the database
  const data = [
    {
      contentID: '1',
      title: 'Control Your Breathing and Fall Asleep',
      imagePath: require('../../assets/temporary/Meditation1.png'),
      description: 'This is the first meditation.',
      topics: 'Sleep',
      language: 'EN',
      duration: '360',
      difficulty: 'B',
      cost: '0'
    },
    {
      contentID: '2',
      title: 'Relajarse y Recargar',
      imagePath: require('../../assets/temporary/Meditation2.png'),
      description: 'Esta es la segunda meditación.',
      topics: 'Anxiety,Stress',
      language: 'ES',
      duration: '3788',
      difficulty: 'B',
      cost: '0'
    },
    {
      contentID: '3',
      title: 'Explore Your Thinking',
      imagePath: require('../../assets/temporary/Meditation3.png'),
      description: 'This is the third meditation.',
      topics: 'Abundance,Anxiety,Stress',
      language: 'EN',
      duration: '600',
      difficulty: 'A',
      cost: '3.99'
    },
  ];

  
  return (
    <View style={styles.app}>
      <ContentList 
        contentType="Meditations"
        data={data}
        filterBy="Difficulty,Language,Topic,Duration"></ContentList>
    </View>
   
  );
};

export default MeditationList;