import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native-elements';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

//https://around25.com/blog/how-to-create-a-simple-music-player-with-react-native/

const Meditation = (props) => {

  return (
    <View style={styles.app}>

    <Image 
      source={require('../../assets/temporary/Meditation1.png')} 
      style={styles.meditationPhoto}
      />
    

    
      <TouchableOpacity
      
        style={styles.playButton}>
      <Image 
      source={require('../../assets/play_button.png')} 
      style={styles.playPhoto}
      />

        </TouchableOpacity>


      {/* <Image 
      source={require('../../assets/play_button.png')} 
      style={styles.playPhoto}
      /> */}
      

        <View style={{top: 50}}>
        <Text>Listen and relax</Text>
      </View>



    </View>
  );
};

export default Meditation;