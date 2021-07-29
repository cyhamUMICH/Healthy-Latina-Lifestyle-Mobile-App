import React from 'react';
import { View, Text} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';

const UploadVideo = (props) => {  

  const pickVideo = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "video/*"
    });

    if (result.type != "cancel") {
      props.setVideo(result);
    }
  };

  return(
    <View>
      <Button 
        title="Upload Video" 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        icon={
          <Icon name="upload" type="font-awesome"
          color={colors.text} style={styles.buttonIconRight} />
        }
        iconRight
        onPress={pickVideo} />
      {props.video && <Text style={styles.fileNameText}>{props.video.name}</Text>}
    </View>
  );
};

export default UploadVideo;