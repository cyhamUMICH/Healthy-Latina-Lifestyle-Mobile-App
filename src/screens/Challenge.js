import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';

const Challenge = ({route}) => {
  const [currentValue, setCurrentValue] = useState(0);

  const item = route.params;
  return (
    <Text>
      Challenge Page
    </Text>
  );
};

export default Challenge;