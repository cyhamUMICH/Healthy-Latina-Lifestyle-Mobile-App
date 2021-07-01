import React from "react";
import { View, TouchableOpacity } from "react-native";
import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from '../styles/Styles';

export default function Controller({ isPlaying, quickForward, quickBackward, playPause }) {
  return (
    <View style={styles.horizontalButtonLayout}>
      <TouchableOpacity onPress={quickBackward}>
        <MaterialIcons name="replay-30" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={playPause}>
        {isPlaying ? <MaterialIcons name="pause" size={45} /> : <MaterialIcons name="play-arrow" size={45} />}
      </TouchableOpacity>
      <TouchableOpacity onPress={quickForward}>
        <MaterialIcons name="forward-30" size={45} />
      </TouchableOpacity>
    </View>
  );
};