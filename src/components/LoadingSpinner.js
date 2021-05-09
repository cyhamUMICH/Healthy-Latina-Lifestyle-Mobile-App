import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';

const LoadingSpinner = () => {
  return (
    <View style={styles.modalView}>
      <ActivityIndicator 
        style={styles.extraLargeSpinner}
        hidesWhenStopped={true}
        size="large"
        color={colors.spinner} />
    </View>
  );
};

export default LoadingSpinner;