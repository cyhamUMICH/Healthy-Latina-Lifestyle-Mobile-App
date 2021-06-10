import React, {useState, useEffect} from 'react';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, Alert } from 'react-native';
import { Button, ButtonGroup, CheckBox } from 'react-native-elements';
import { GetTopics } from '../components/GetTopics';
import TopicButtons from '../components/TopicButtons';
import UploadImage from '../components/UploadImage';
import UploadAudio from '../components/UploadAudio';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const AddMeditation = ({route}) => {
  const {topics, navigation} = route.params;

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const languageOptions = [{label: 'English', value: 'EN'}, {label: 'Spanish', value: 'ES'}];
  const [selectedLanguage, setSelectedLanguage] = useState();
  const difficultyOptions = [{label: 'Beginner', value: 'B'}, {label: 'Advanced', value: 'A'}];
  const [selectedDifficulty, setSelectedDifficulty] = useState();
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [topicsList, setTopicsList] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [duration, setDuration] = useState();
  const [cost, setCost] = useState();
  const [isFeatured, setIsFeatured] = useState(false);

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  const baseImagePath = "meditations/images/";
  const baseAudioPath = "meditations/audios/";

  useEffect(() => {
    if (topicsList.length === 0) {
      if (topics != null) {
        setTopicsList(topics);
        setIsTopicsLoaded(true);
      }
      else {
        GetTopics(setIsTopicsLoaded, setTopicsList);
      }
    }
  }, []);

  const formComplete = () => {
    return (title && description && selectedLanguage && selectedDifficulty && selectedTopics && image && audio
      && duration && cost);
  };

  const validateDuration = () => {
    return duration && !isNaN(parseInt(duration));
  }

  const validateCost = () => {
    return cost && !isNaN(parseFloat(cost));
  }

  const submit = async () => {

    if (formComplete() && validateDuration() && validateCost()) 
    {
      const dbh = firebase.firestore();
      const docRef = await dbh.collection("meditations").add({
        title: title,
        description: description,
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        topics: selectedTopics,
        duration: parseInt(duration),
        cost: parseFloat(cost),
        featured: isFeatured,
        dateAdded: new Date()
      });
      
      await docRef.update({
        imagePath: baseImagePath + docRef.id + "__" + image.filename,
        audioPath: baseAudioPath + docRef.id + "__" + audio.name
      });

      const imageLoc = firebase.storage().ref().child(baseImagePath.concat(docRef.id).concat("__").concat(image.filename));
      // Code from: https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
      const imageResponse = await fetch(image.uri);
      const imageBlob = await imageResponse.blob();
      setIsUploadInProgress(true);
      let uploadImageStatus = imageLoc.put(imageBlob);

      // Code from: https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask#on
      uploadImageStatus.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        'complete': async function() {
          const audioLoc = firebase.storage().ref().child(baseAudioPath.concat(docRef.id).concat("_").concat(audio.name));
          // Code from: https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
          const audioResponse = await fetch(audio.uri);
          const audioBlob = await audioResponse.blob();
          let uploadAudioStatus = audioLoc.put(audioBlob);
          uploadAudioStatus.on(firebase.storage.TaskEvent.STATE_CHANGED, {
            'complete': function() {
              setIsUploadInProgress(false);
              navigation.goBack();
              navigation.replace("MeditationList");
            },
            'error': function() {
              Alert.alert(
                "Error Adding Meditation",
                "There was an error when uploading the audio.",
                [
                  {text: "OK"}
                ]
              );
            }
          });
        },
        'error': function() {
          Alert.alert(
            "Error Adding Meditation",
            "There was an error when uploading the image.",
            [
              {text: "OK"}
            ]
          );
        }
      });
    }
    else
    {
      Alert.alert(
        "Error Adding Meditation",
        "Please complete all of the fields before submitting, and check the format of the duration and cost fields.",
        [
          {text: "OK"}
        ]
      );
    }
  };

  return(
    <View style={styles.app}>
      {
        isTopicsLoaded && !isUploadInProgress ?
          <View style={styles.fullWidthWindow}>
            <Text style={styles.contentTitle}>Add Meditation</Text>
              <View style={styles.flexContainer}>
                <KeyboardAvoidingView 
                behavior="padding"
                style={styles.inputView}>
                <ScrollView>
                  <TextInput
                    style={styles.inputText} textAlign="center"
                    placeholder="title" placeholderTextColor={colors.text} 
                    onChangeText={input => setTitle(input)} />
                  <TextInput 
                    style={styles.inputText} textAlign="left"
                    placeholder="description" placeholderTextColor={colors.text}
                    multiline textAlignVertical="top" numberOfLines={6} 
                    onChangeText={input => setDescription(input)} />
                  <Text style={styles.cardTitle}>Language</Text>
                  <ButtonGroup
                    textStyle={styles.buttonGroupText}
                    buttonStyle={styles.buttonGroup}
                    selectedButtonStyle={styles.buttonGroupSelected}
                    onPress={(selectedIndex) => setSelectedLanguage(languageOptions[selectedIndex].value)}
                    selectedIndex={languageOptions.findIndex((lang => lang.value == selectedLanguage))}
                    buttons={languageOptions.map((lang) => lang.label)}
                  />
                  <Text style={styles.cardTitle}>Difficulty</Text>
                  <ButtonGroup
                    textStyle={styles.buttonGroupText}
                    buttonStyle={styles.buttonGroup}
                    selectedButtonStyle={styles.buttonGroupSelected}
                    onPress={(selectedIndex) => setSelectedDifficulty(difficultyOptions[selectedIndex].value)}
                    selectedIndex={difficultyOptions.findIndex((lang => lang.value == selectedDifficulty))}
                    buttons={difficultyOptions.map((lang) => lang.label)}
                  />
                  <Text style={styles.cardTitle}>Topics (Select All)</Text>
                  <TopicButtons 
                    topicsList={topicsList} 
                    topics={selectedTopics} 
                    topicsFunction={setSelectedTopics} />
                  <UploadImage image={image} setImage={setImage} />
                  <UploadAudio audio={audio} setAudio={setAudio} />
                  <TextInput
                    style={styles.inputText} textAlign="center"
                    placeholder="duration (seconds)" placeholderTextColor={colors.text} 
                    onChangeText={input => setDuration(input)} />
                  <TextInput
                    style={styles.inputText} textAlign="center"
                    placeholder="cost" placeholderTextColor={colors.text} 
                    onChangeText={input => setCost(input)} />
                  <CheckBox
                    title="Featured"
                    checkedIcon='check-square'
                    uncheckedIcon='square'
                    checked={isFeatured}
                    checkedColor={colors.accentBackground}
                    uncheckedColor={colors.uncheckedColor}
                    containerStyle={styles.checkBoxContainer}
                    textStyle={styles.checkBoxLabel}
                    onPress={() => setIsFeatured(!isFeatured)}
                  />
                  <Button 
                    title="Submit" 
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    onPress={submit} />
                </ScrollView>
              </KeyboardAvoidingView>
            </View>
          </View>
        : <LoadingSpinner />
      }
    </View>
  );
};

export default AddMeditation;