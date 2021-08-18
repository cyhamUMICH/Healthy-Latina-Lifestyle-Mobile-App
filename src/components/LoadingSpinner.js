import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';

const LoadingSpinner = (props) => {
  return (
    <View style={styles.modalView}>
      <ActivityIndicator 
        style={styles.extraLargeSpinner}
        hidesWhenStopped={true}
        size="large"
        color={colors.spinner} />
      { props.progress ? <Text>{props.progress.toFixed(2)}% Complete</Text>: null }
    </View>
  );
};

export default LoadingSpinner;