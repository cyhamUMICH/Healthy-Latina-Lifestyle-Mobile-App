import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from '../styles/Styles';

const CourseSection = ({route}, props) => {

  const item = route.params;

  return (
    <View style={styles.app}>
      <View style={styles.fullWidthWindow}>
        <Text style={styles.contentTitle}>{item.title}</Text>
        <ScrollView style={styles.contentDescriptionSpacer}>
          <Text style={styles.contentDesc}>{item.description}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default CourseSection;
