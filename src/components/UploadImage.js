import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, Image, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';

const UploadImage = (props) => {
  // Code from: https://docs.expo.io/versions/latest/sdk/imagepicker/
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: (props.isProfilePicture) ? [1, 1] : [16, 9],
      quality: 1
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
      result["filename"] = filename;
      props.setImage(result);
    }
  };

  return(
    <View>
      <Button 
        title="Upload Image" 
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
        icon={
          <Icon name="upload" type="font-awesome"
          color={colors.text} style={styles.buttonIconRight} />
        }
        iconRight
        onPress={pickImage} />
      {props.image && <Image source={{ uri: props.image.uri }} 
        style={props.isProfilePicture ? styles.uploadedProfileImage : styles.uploadedImage} />}
    </View>
  );
};

export default UploadImage;