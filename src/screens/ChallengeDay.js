import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import ChallengeDayList from "../components/ChallengeDayList";

const goNext = () => {
  console.log("go forward 30 seconds");
};
const goPrv = () => {
  console.log("go back 30 seconds");
};
const goPause = () => {
  console.log("paused");
}

const ChallengeDay = ({route}, props) => {
  const [currentValue, setCurrentValue] = useState(0);

  const item = route.params;
  return (
    <View style={styles.fullWidthWindow}>
      <Image source={{ uri: item.imagePath }}
        style={styles.meditationPhoto}></Image>
      {/* <Tags difficulty={item.difficulty} topics={item.topics}></Tags> */}
      <Text style={styles.contentTitle}>{item.title}</Text>
      
      <View style={styles.sliderAndController}>
        <PlayerSlider currentValue={currentValue} setCurrentValue={setCurrentValue} duration={item.duration}/>
        <Controller onNext={goNext} onPrv={goPrv} onPause={goPause} currentValue={currentValue} setCurrentValue={setCurrentValue} />
      </View>   


      <ScrollView style={styles.contentDescriptionSpacer}>
        <Text style={styles.contentDesc}>{item.description}</Text>
      </ScrollView>

      

    </View>
  );
};

export default ChallengeDay;
