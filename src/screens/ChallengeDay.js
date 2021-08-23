import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { styles } from '../styles/Styles';

const printDate = (date) => {
  if (date) {
    // Add one since getMonth() gives the month index
    let month = date.getMonth() + 1;
  
    return month + '/' + date.getDate() + '/' + date.getFullYear();
  }
};

const ChallengeDay = ({route}, props) => {
  const item = route.params;
 
  return (
    <View style={styles.app}>
    <View style={styles.fullWidthWindow}>
      <Text style={styles.contentTitle}>{printDate(item.date.toDate())}</Text>
      <ScrollView style={styles.contentDescriptionSpacer}>
        <Text style={styles.contentDesc}>{item.description}</Text>
      </ScrollView>
    </View>
    </View>
  );
};

export default ChallengeDay;
