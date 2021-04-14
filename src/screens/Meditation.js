import { useLinkProps } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { View, Text } from 'react-native';
import { styles } from '../styles/Styles';

const Meditation = (props) => {
  return (
    <View style={styles.app}>


      <View style={{top: 200}}>
        <Text>Meditation description goes here </Text>
      </View>

      {/* insert image */}

      <Button title="Start Meditation" onPress={() => props.navigation.navigate("Temp")} />


    </View>
  );
};

export default Meditation;