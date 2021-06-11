import React from 'react';
import { View, Text} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';

const UploadAudio = (props) => {  

  const pickAudio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "audio/*"
    });

    if (result.type != "cancel") {
      props.setAudio(result);
    }
  };

  return(
    <View>
      <Button 
        title="Upload Audio" 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        icon={
          <Icon name="upload" type="font-awesome"
          color={colors.text} style={styles.buttonIconRight} />
        }
        iconRight
        onPress={pickAudio} />
      {props.audio && <Text style={styles.fileNameText}>{props.audio.name}</Text>}
    </View>
  );
};

export default UploadAudio;