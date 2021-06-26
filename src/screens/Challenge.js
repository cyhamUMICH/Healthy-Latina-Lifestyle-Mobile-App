import React, { useState } from "react";
import { View, Text, Image, ScrollView} from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const Challenge = ({route}, props) => {

  const [data, setData] = useState([]);           
  const [isLoaded, setIsLoaded] = useState(false);
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

      <Text style={styles.contentDesc}>{item.description}{"\n"}</Text>

      
      <Text>Challenge starts on: {theStartDate}</Text>
      <Text>Challenge ends on: {theEndDate}</Text>


      <Text>This challenge is {challengeLength} days long </Text>

  

    </View>





  );
};

export default Challenge;
