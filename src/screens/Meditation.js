import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';

const goNext = () => {
  console.log("end");
};
const goPrv = () => {
  console.log("beginning");
};

const Meditation = ({route}) => {
  const [currentValue, setCurrentValue] = useState(0);

  const item = route.params;
  return (
    <View style={styles.fullWidthWindow}>
      <Image source={{ uri: item.imagePath }}
        style={styles.cardImage}></Image>
      <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
      <Text style={styles.contentTitle}>{item.title}</Text>
      <ScrollView style={styles.contentDescriptionSpacer}>
        <Text style={styles.contentDesc}>{item.description}</Text>
      </ScrollView>
      <View style={styles.sliderAndController}>
        <PlayerSlider currentValue={currentValue} setCurrentValue={setCurrentValue} duration={item.duration}/>
        <Controller onNext={goNext} onPrv={goPrv} currentValue={currentValue} setCurrentValue={setCurrentValue} />
      </View>     
    </View>
  );
};

export default Meditation;

// import { useLinkProps } from '@react-navigation/native';
// import React from 'react';
// import { Button } from 'react-native-elements';
// import { View, Text } from 'react-native';
// import { styles } from '../styles/Styles';
// import { Image } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// //https://around25.com/blog/how-to-create-a-simple-music-player-with-react-native/

// const Meditation = (props) => {

//   return (
//     <View style={styles.app}>

//     <Image 
//       source={require('../../assets/temporary/Meditation1.png')} 
//       style={styles.meditationPhoto}
//       />
    

    
//       <TouchableOpacity
      
//         style={styles.playButton}>
//       <Image 
//       source={require('../../assets/play_button.png')} 
//       style={styles.playPhoto}
//       />

//         </TouchableOpacity>


//       {/* <Image 
//       source={require('../../assets/play_button.png')} 
//       style={styles.playPhoto}
//       /> */}
      

//         <View style={{top: 50}}>
//         <Text>Listen and relax</Text>
//       </View>



//     </View>
//   );
// };

// export default Meditation;