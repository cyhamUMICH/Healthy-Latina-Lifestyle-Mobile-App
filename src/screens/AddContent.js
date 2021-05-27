import React from 'react';
import { View } from 'react-native';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';

const AddContent = (props) => {
  return (
    <View style={styles.app}>
      <Button 
         buttonStyle={styles.button}
         titleStyle={styles.buttonText}
         title="Add Meditation" onPress={() => props.navigation.navigate("AddMeditation")} 
          />

    </View>
  );
};

export default AddContent;