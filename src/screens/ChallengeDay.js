import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import defaultImage from '../../assets/logo-icon.png';

const ChallengeDay = ({route}, props) => {
  // const [currentValue, setCurrentValue] = useState(0);
  const item = route.params;
  console.log("for challenge day " + item.title);
  console.log("for challenge day the photo is " + item.imagePath);
  // const item = route.params;
  return (

    <View style={styles.app}>
        <Text>Challenge Page</Text>
    
    </View>
    // <View style={styles.fullWidthWindow}>
    //   {/* <Image source={{ uri: item.imagePath ? item.imagePath : Image.resolveAssetSource(defaultImage).uri }}
    //     style={styles.meditationPhoto}></Image> */}
    //   {/* <Tags difficulty={item.difficulty} topics={item.topics}></Tags> */}
    //   <Text style={styles.contentTitle}>{item.title}</Text>
      
      

    //   <ScrollView style={styles.contentDescriptionSpacer}>
    //     <Text style={styles.contentDesc}>{item.description}</Text>
    //   </ScrollView>

      

    // </View>
  );
};

export default ChallengeDay;
