import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import  MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import ShareContent from '../screens/ShareContent';
import ContentList from "./ContentList";
import { Icon } from "react-native-elements";

export default function SendContent(props) {
  return (
    <View style={styles.sendContentButtonLayout}>
      <TouchableOpacity onPress={() => {navigation.navigate("ChatRoomHome")}}>
            <Icon name="send" type="font-awesome" color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};