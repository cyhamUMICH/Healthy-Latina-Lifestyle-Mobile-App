import React, {useState, useEffect} from 'react';
import { styles } from '../styles/Styles';
import { TouchableOpacity } from 'react-native';
import { Image, View , Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Button } from 'react-native';
//import RNFetchBlob from 'react-native-fetch-blob';

export default function chooseFile(props) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [imageVideo, setImageVideo] = useState(null);

  useEffect(() => {
    (async () => {

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');


    })();
  }, []);

  const pickImageVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });
    console.log(result);

    if (!result.cancelled) {
      setImageVideo(result.uri);
    }
  };

  if (hasGalleryPermission === false) {
    return <View />;
  }

  {/*const [imageVideo, setImageVideo] = useState(null); 

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
       if (galleryStatus !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImageVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
      videoQuality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageVideo(result.uri);
    }
  };

  const pickMedia = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio'
    })

    console.log(media);

    if (!media.cancelled) {
      setAudio(media.uri);
    }
   } */}

  return (
 
    <View style={{ flex: 1 }}>
    <Text style={styles.contentTitle}>Upload Content</Text>
    <TouchableOpacity style={styles.uploadactionbutton} onPress={pickImageVideo}>
      <Image source={require('../../assets/upload-icon.png')} style = {styles.uploadbutton}></Image>
      </TouchableOpacity>
    {imageVideo && <Image source={{ uri: imageVideo }} style={{ flex: 1 }} />}
    </View>
    );
    
    {/*<TouchableOpacity style={styles.uploadactionbutton} onPress={pickImageVideo}>
      <Image source={require('../../assets/upload-icon.png')} style = {styles.uploadbutton}></Image>
      {imageVideo && <Image source={{ uri: imageVideo }} style={{ flex: 1}} />}
  </TouchableOpacity> */}

}
