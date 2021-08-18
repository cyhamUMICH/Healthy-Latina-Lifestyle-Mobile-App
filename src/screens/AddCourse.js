import React, {useState, useEffect} from 'react';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, Alert } from 'react-native';
import { Button, ButtonGroup, CheckBox } from 'react-native-elements';
import { GetTopics } from '../components/GetTopics';
import TopicButtons from '../components/TopicButtons';
import UploadImage from '../components/UploadImage';
import UploadVideo from '../components/UploadVideo';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const AddCourse = ({route}) => {
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
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState();
  const [cost, setCost] = useState();
  const [isFeatured, setIsFeatured] = useState(false);

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const baseImagePath = "courses/images/";
  const baseVideoPath = "courses/videos/";

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
    return (title && description && selectedLanguage && selectedDifficulty && selectedTopics && image && video
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
      const docRef = await dbh.collection("courses").add({
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
        videoPath: baseVideoPath + docRef.id + "__" + video.name
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
          const videoLoc = firebase.storage().ref().child(baseVideoPath.concat(docRef.id).concat("__").concat(video.name));
          const videoURI = (video.uri.substr(0,7) != "file://") ? "file://" + video.uri : video.uri;
          // Code from: https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
          const videoResponse = await fetch(videoURI);
          const videoBlob = await videoResponse.blob();
          let uploadVideoStatus = videoLoc.put(videoBlob);
          uploadVideoStatus.on(firebase.storage.TaskEvent.STATE_CHANGED, {
            'next': function(snapshot) {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgressPercent(progress);
            },
            'complete': function() {
              setIsUploadInProgress(false);
              navigation.goBack();
              navigation.replace("CourseList");
            },
            'error': function() {
              Alert.alert(
                "Error Adding Course Video",
                "There was an error when uploading the video.",
                [
                  {text: "OK"}
                ]
              );
            }
          });
        },
        'error': function() {
          Alert.alert(
            "Error Adding Course Video",
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
        "Error Adding Course Video",
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
            <Text style={styles.contentTitle}>Add Course</Text>
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
                  <UploadVideo video={video} setVideo={setVideo} />
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
        : <LoadingSpinner progress={isUploadInProgress ? progressPercent : null} />
      }
    </View>
  );
};

export default AddCourse;