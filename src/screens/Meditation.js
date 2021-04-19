import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
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


      <View style={{top: 200}}>
        <Text>Listen and relax</Text>
      </View>

     
      <TouchableOpacity
        style={styles.playButton}>
        </TouchableOpacity>



    </View>
  );
};

export default Meditation;