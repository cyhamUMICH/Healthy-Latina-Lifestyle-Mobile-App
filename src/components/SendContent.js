import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from '../styles/Styles';
import ShareContent from '../screens/ShareContent';

export default function SendContent({onShare}) {
  return (
    <View style={styles.horizontalButtonLayout}>
      <TouchableOpacity onPress={onShare}>
        <MaterialIcons name="replay-30" size={45} />
      </TouchableOpacity>
    </View>
  );
};