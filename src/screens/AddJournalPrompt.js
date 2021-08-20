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

const AddJournalPrompt = ({route}, props) => {
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
  const [isFeatured, setIsFeatured] = useState(false);

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

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
    return (title && description && selectedLanguage && selectedDifficulty && selectedTopics);
  };


  const submit = async () => {

    if (formComplete()) 
    {
      const dbh = firebase.firestore();
      const docRef = await dbh.collection("journalPrompts").add({
        title: title,
        description: description,
        language: selectedLanguage,
        difficulty: selectedDifficulty,
        topics: selectedTopics,
        featured: isFeatured,
        dateAdded: new Date(),
        imagePath: "meditations/images/test.png"
      });
    }
    else
    {
      Alert.alert(
        "Error Adding Journal Prompt",
        "Please complete all of the fields before submitting, and check the format of the fields.",
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
            <Text style={styles.contentTitle}>Add Journal Prompt</Text>
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

export default AddJournalPrompt;