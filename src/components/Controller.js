import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from '../styles/Styles';

export default function Controller({ currentValue, setCurrentValue, onNext, onPrv, onPause }) {
  return (
    <View style={styles.horizontalButtonLayout}>
      <TouchableOpacity onPress={onPrv}>
        <MaterialIcons name="replay-30" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPause}>
        <MaterialIcons name="pause" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <MaterialIcons name="forward-30" size={45} />
      </TouchableOpacity>
    </View>
  );
};