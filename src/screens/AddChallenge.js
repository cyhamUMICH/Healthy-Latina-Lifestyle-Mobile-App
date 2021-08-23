import React, {useState, useEffect} from 'react';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, Alert } from 'react-native';
import { Button, ButtonGroup, CheckBox } from 'react-native-elements';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GetTopics } from '../components/GetTopics';
import TopicButtons from '../components/TopicButtons';
import UploadImage from '../components/UploadImage';
import ChallengeDays from '../components/ChallengeDays';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const AddChallenge = ({route}) => {
  const today = new Date();
  const defaultStartDate = new Date(today.getFullYear(), today.getMonth(),
    today.getDate(), 0, 0, 0, 0);
  const defaultEndDate = new Date(today.getFullYear(), today.getMonth(),
    today.getDate() + 6, 23, 59, 59, 59);

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
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [showStartDate, setShowStartDate] = useState(false);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [showEndDate, setShowEndDate] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);

  const [duration, setDuration] = useState();

  const [challengeDaysDates, setChallengeDaysDates] = useState([]);
  const [challengeDaysDescriptions, setChallengeDaysDescriptions] = useState([]);

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);
  const baseImagePath = "challenges/images/";

  const printDateTime = (date) => {
    // Add one since getMonth() gives the month index
    let month = date.getMonth() + 1;
    // Code from: https://medium.com/front-end-weekly/how-to-convert-24-hours-format-to-12-hours-in-javascript-ca19dfd7419d
    let hours = date.getHours();
    let AmOrPm = hours >= 12 ? 'PM' : 'AM';
    hours = (hours % 12) || 12;
    hours = (hours < 10) ? '0' + hours : hours;
  
    let minutes = date.getMinutes();
    minutes = (minutes < 10) ? '0' + minutes : minutes;
  
    return month + '/' + date.getDate() + '/' + date.getFullYear() 
      + ' ' + hours + ':' + minutes + ' ' + AmOrPm + ' ' 
      // Code from: https://stackoverflow.com/questions/1091372/getting-the-clients-time-zone-and-offset-in-javascript
      + date.toString().match(/\(([A-Za-z\s].*)\)/)[1];
  };
  
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

    // Create the dates so the start date is at midnight and end date at 11:59pm
    // Then, the number of dates the challenge spans can be calculated, even if it
    //    isn't the whole day (i.e. 1/1/2021 at 4pm to 1/3/2021 at 10am is 3 days)
    let startDateMidnight = new Date(startDate.getFullYear(), startDate.getMonth(),
      startDate.getDate(), 0, 0, 0, 0);
    let endDateEOD = new Date(endDate.getFullYear(), endDate.getMonth(),
      endDate.getDate(), 23, 59, 59, 59);
    setDuration(Math.round((endDateEOD.getTime() - startDateMidnight.getTime()) / (1000 * 60 * 60 * 24)));
  }, [startDate, endDate]);

  const formComplete = () => {
    return (title && description && selectedLanguage && selectedDifficulty && selectedTopics && image
      && startDate && endDate && challengeDaysFormsComplete());
  };
  
  const challengeDaysFormsComplete = () => {
    for(let i = 0; i < duration; i++) {
      if (!challengeDaysDates[i] || challengeDaysDescriptions[i] == "" || !challengeDaysDescriptions[i])
        return false;
    }

    return true;
  };

  const validateDates = () => {
    return startDate.getTime() < endDate.getTime();
  };

  const submit = async () => {
    if (formComplete() && validateDates()) {
      const dbh = firebase.firestore();
      const docRef = await dbh.collection("challenges").add({
        title: title,
        description: description,
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        topics: selectedTopics,
        startDate: startDate,
        endDate: endDate,
        featured: isFeatured,
        dateAdded: new Date()
      });
      
      await docRef.update({
        imagePath: baseImagePath + docRef.id + "__" + image.filename,
      });

      for(let i = 0; i < duration; i++) {
        const challengeDayRef = await dbh.collection("challengeDays").add({
          challengeID: docRef.id,
          description: challengeDaysDescriptions[i],
          date: challengeDaysDates[i]
        });
      }

      const imageLoc = firebase.storage().ref().child(baseImagePath.concat(docRef.id).concat("__").concat(image.filename));
      // Code from: https://medium.com/@ericmorgan1/upload-images-to-firebase-in-expo-c4a7d4c46d06
      const imageResponse = await fetch(image.uri);
      const imageBlob = await imageResponse.blob();
      setIsUploadInProgress(true);
      let uploadImageStatus = imageLoc.put(imageBlob);

      // Code from: https://firebase.google.com/docs/reference/js/firebase.storage.UploadTask#on
      uploadImageStatus.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        'complete': function() {
          setIsUploadInProgress(false);
          navigation.goBack();
          navigation.replace("ChallengeList");
        },
        'error': function() {
          Alert.alert(
            "Error Adding Challenge",
            "There was an error when uploading the image.",
            [
              {text: "OK"}
            ]
          );
        }
      });
    }
    else {
      Alert.alert(
        "Error Adding Challenge",
        "Please complete all of the fields before submitting, and check the start date is before the end date.",
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
            <Text style={styles.contentTitle}>Add Challenge</Text>
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
                  <Text style={styles.cardTitle}>{printDateTime(startDate)}</Text>
                  <Button
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText} 
                    onPress={() => {setShowStartDate(true)}} title="Pick Start Date" />
                  <DateTimePickerModal
                    date={startDate}
                    isVisible={showStartDate}
                    mode="datetime"
                    onConfirm={(date) => {
                      setShowStartDate(false);
                      setStartDate(date);
                    }}
                    onCancel={() => setShowStartDate(false)}
                  />
                  <Text style={styles.cardTitle}>{printDateTime(endDate)}</Text>
                  <Button
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText} 
                    onPress={() => {setShowEndDate(true)}} title="Pick End Date (inclusive)" />
                  <DateTimePickerModal
                    date={endDate}
                    isVisible={showEndDate}
                    mode="datetime"
                    onConfirm={(date) => {
                      setShowEndDate(false);
                      setEndDate(date);
                    }}
                    onCancel={() => setShowEndDate(false)}
                  />
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
                  <ChallengeDays 
                    duration={duration}
                    startDate={startDate} 
                    challengeDaysDates={challengeDaysDates}
                    setChallengeDaysDates={setChallengeDaysDates} 
                    challengeDaysDescriptions={challengeDaysDescriptions}
                    setChallengeDaysDescriptions={setChallengeDaysDescriptions} />
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

export default AddChallenge;