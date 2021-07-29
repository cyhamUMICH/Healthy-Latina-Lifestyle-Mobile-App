import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';

const ShareContent = (props) => {
  return (
    <View style={styles.app}>
      <Button 
         buttonStyle={styles.button}
         titleStyle={styles.buttonText}
         title="Share Meditation" onPress={() => props.navigation.navigate("MeditationList")} 
          />
      <Button 
         buttonStyle={styles.button}
         titleStyle={styles.buttonText}
         title="Share Challenge" onPress={() => props.navigation.navigate("ChallengeList")} 
          />
        <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Share Yoga"
        />
        <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Share Course"
        />
        <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Share Journal Prompt"
        />
        <Button 
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            title="Share Podcast"
        />

    </View>
  );
};

export default ShareContent;