import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';

const Challenge = ({route}) => {
  const item = route.params;
  
  const theStartDate = item.startDate.toDate().toString().slice(4, 15);
  const theEndDate = item.endDate.toDate().toString().slice(4, 15);

  const challengeLength = (item.endDate.toDate().getDate() - item.startDate.toDate().getDate()) + 1;

  return (
    <View style={styles.fullWidthWindow}>
      <Image source={{ uri: item.imagePath }}
        style={styles.challengePhoto}></Image>
       <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
      <Text style={styles.contentTitle}>{item.title}</Text> 
      
      <Text>Challenge starts on: {theStartDate}</Text>
      <Text>Challenge ends on: {theEndDate}</Text>

      <Text>This challenge is {challengeLength} days long </Text>


      <ScrollView style={styles.contentDescriptionSpacer}>
        <Text style={styles.contentDesc}>{item.description}</Text>
      </ScrollView>

      


    </View>
  );
};

export default Challenge;
