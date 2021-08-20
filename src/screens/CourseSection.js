import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import defaultImage from '../../assets/logo-icon.png';

const CourseSection = ({route}, props) => {

  const item = route.params;

  return (

    <View style={styles.app}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDesc}>{item.description}</Text>
    </View>

  );
};

export default CourseSection;
