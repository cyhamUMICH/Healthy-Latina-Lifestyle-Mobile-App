import React, {useState, useEffect} from 'react';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import { View, KeyboardAvoidingView, ScrollView, Text, TextInput, Alert } from 'react-native';
import { Button, ButtonGroup, CheckBox } from 'react-native-elements';
import { GetTopics } from '../components/GetTopics';
import TopicButtons from '../components/TopicButtons';
import UploadImage from '../components/UploadImage';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";

const AddChallenge = ({route}) => {
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
  const [isFeatured, setIsFeatured] = useState(false);

  const [isUploadInProgress, setIsUploadInProgress] = useState(false);

  const baseImagePath = "meditations/images/";
  const baseAudioPath = "meditations/audios/";

  useEffect(() => {
    if (topics != null) {
      setTopicsList(topics);
      setIsTopicsLoaded(true);
    }
    else {
      GetTopics(setIsTopicsLoaded, setTopicsList);
    }
  }, []);

  const submit = async () => {
    // TODO
  };

  return(
    <View style={styles.app}>
      {
        isTopicsLoaded && !isUploadInProgress ?
          <View style={styles.fullWidthWindow}>
            <Text style={styles.contentTitle}>Add Challenge</Text>
              <View style={styles.fullWidthWindow}>
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

export default AddChallenge;