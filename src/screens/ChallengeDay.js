import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';


const ChallengeDay = ({route}, props) => {
  // const [currentValue, setCurrentValue] = useState(0);

  // const item = route.params;
  return (

    <View style={styles.app}>
        <Text>Challenge Page</Text>
    
    </View>
    // <View style={styles.fullWidthWindow}>
    //   {/* <Image source={{ uri: item.imagePath }}
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
