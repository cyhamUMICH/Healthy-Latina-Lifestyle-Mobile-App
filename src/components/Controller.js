import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from '../styles/Styles';

export default function Controller({ currentValue, setCurrentValue, onNext, onPrv }) {
  return (
    <View style={styles.horizontalButtonLayout}>
      <TouchableOpacity onPress={onPrv}>
        <MaterialIcons name="skip-previous" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <MaterialIcons name="pause" size={45} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onNext}>
        <MaterialIcons name="skip-next" size={45} />
      </TouchableOpacity>
    </View>
  );
};