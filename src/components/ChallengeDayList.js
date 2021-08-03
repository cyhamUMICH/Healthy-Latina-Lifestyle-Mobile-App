import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import Tags from './Tags';
import LoadingSpinner from './LoadingSpinner';


const ChallengeCards = (props) => {
  return (
    (props.filteredList.length != 0) 
    ? <FlatList 
        style={props.style}
        data={props.filteredList}
        renderItem={(item) => ChallengeCard(item, props.contentComponent, props.navigation)}
        keyExtractor={item => item.contentID} /> 
    : <Text style={styles.noContent}>No {props.contentType} Match Your Search</Text>
  );
};

const ChallengeCard = ({item}, contentComponent, navigation) => {
  // Convert seconds to HH:MM:SS, then remove HH if 00
  // https://stackoverflow.com/questions/1322732/convert-seconds-to-hh-mm-ss-with-javascript

  console.log("The content component is" + contentComponent);
  console.log("The content item is" + item);




  let duration;
  if (item.duration){
    duration = new Date(item.duration * 1000).toISOString().substr(11, 8);
    duration = (duration.substr(0, 2) == "00") ? duration.substr(3) : duration;
  }

  return (
    <TouchableOpacity 
        onPress={() => {navigation.navigate(contentComponent, item)}}>
      <Card containerStyle={styles.card}>
        {/* <Card.Image source={{ uri: item.imagePath }}
          style={styles.cardImage}>
          {item.duration && <Text style={styles.duration}>{duration}</Text>}
        </Card.Image> */}
        {/* <Tags difficulty={item.difficulty} topics={item.topics}></Tags> */}
        {/* <Card.Divider/> */}
        <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
      </Card>
    </TouchableOpacity>
  );
};

const ChallengeDayList = (props) => {
  return (
    <View style={styles.fullWidthWindow}>
      <Text style={styles.challengeDayTitle}>
        Challenge Days
      </Text>
      <ChallengeCards 
        style={styles.cardList} 
        contentType={props.contentType}
        filteredList={props.data}
        contentComponent={props.contentComponent}
        navigation={props.navigation} />
    </View>
  );
};

export default ChallengeDayList;
