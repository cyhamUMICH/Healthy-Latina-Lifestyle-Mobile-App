import React, { useState, useEffect } from 'react';
import { Modal, ScrollView, View, Text } from "react-native";
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';

const tempTopics = [
  "Anxiety", "Abundance", "Stress", "Sleep"
];

const durationLimits = [
  {
    id: "Short",
    label: "Less than 10 Minutes",
    min: 0 * 60,
    max: 10 * 60
  },
  {
    id: "Medium",
    label: "10 to 20 Minutes",
    min: 10 * 60,
    max: 20 * 60
  },
  {
    id: "Long",
    label: "More than 20 Minutes",
    min: 20 * 60,
    max: null
  }
];

const DifficultyOptions = (props) => {
  useEffect(() => {
    props.difficultyFunction(props.originalProps.filterSettings.difficultyFilter);
  }, []);

  return (
    <View style={styles.modalSection}>
      <Text style={styles.modalText}>Difficulty</Text>
      <View style={styles.horizontalButtonLayout}> 
        <View style={styles.modalButtonWrapper}>       
          <Button
            buttonStyle={props.difficulty.indexOf('B') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.difficulty.indexOf('B') > -1)
              {
                props.difficultyFunction(props.difficulty.filter(item => item != 'B'));
              }
              else
              {
                props.difficultyFunction(props.difficulty.concat('B'));
              }
            }}
            title="Beginner"/>
        </View>
        <View style={styles.modalButtonWrapper}> 
          <Button
            buttonStyle={props.difficulty.indexOf('A') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.difficulty.indexOf('A') > -1)
              {
                props.difficultyFunction(props.difficulty.filter(item => item != 'A'));
              }
              else
              {
                props.difficultyFunction(props.difficulty.concat('A'));
              }
            }}
            title="Advanced"/>
        </View>
      </View>
    </View>
  );
};

const LanguageOptions = (props) => {
  useEffect(() => {
    props.languageFunction(props.originalProps.filterSettings.languageFilter);
  }, []);

  return (
    <View style={styles.modalSection}>
      <Text style={styles.modalText}>Language</Text>
      <View style={styles.horizontalButtonLayout}> 
        <View style={styles.modalButtonWrapper}>       
          <Button
            buttonStyle={props.language.indexOf('EN') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.language.indexOf('EN') > -1)
              {
                props.languageFunction(props.language.filter(item => item != 'EN'));
              }
              else
              {
                props.languageFunction(props.language.concat('EN'));
              }
            }}
            title="English"/>
        </View>
        <View style={styles.modalButtonWrapper}> 
          <Button
            buttonStyle={props.language.indexOf('ES') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.language.indexOf('ES') > -1)
              {
                props.languageFunction(props.language.filter(item => item != 'ES'));
              }
              else
              {
                props.languageFunction(props.language.concat('ES'));
              }
            }}
            title="Spanish"/>
        </View>
      </View>
    </View>
  );
};

const TopicOptions = (props) => {
  useEffect(() => {
    props.topicsFunction(props.originalProps.filterSettings.topicFilter);
  }, []);

  return (
    <View style={styles.modalSection}>
      <Text style={styles.modalText}>Topics</Text>
      <View style={styles.horizontalButtonLayout}> 
          {
            tempTopics.sort().map(topic =>  
              <View key={topic} style={styles.modalButtonWrapper}>         
                <Button
                  buttonStyle={props.topics.indexOf(topic) > -1 ? styles.selectedFilterButton : styles.button}
                  titleStyle={styles.buttonText}
                  onPress={() => {
                    if (props.topics.indexOf(topic) > -1)
                    {
                      props.topicsFunction(props.topics.filter(item => item != topic));
                    }
                    else
                    {
                      props.topicsFunction(props.topics.concat(topic));
                    }
                  }}
                  title={topic}/>
              </View>
            )
          }     
      </View>
    </View>
  );
};

const DurationOptions = (props) => {
  useEffect(() => {
    props.durationFunction(props.originalProps.filterSettings.durationFilter);
  }, []);

  return (
    <View style={styles.modalSection}>
      <Text style={styles.modalText}>Duration</Text>
      <View style={styles.horizontalButtonLayout}> 
        <View style={styles.modalButtonWrapper}>       
          <Button
            buttonStyle={props.duration.indexOf('Short') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.duration.indexOf('Short') > -1)
              {
                props.durationFunction(props.duration.filter(item => item != 'Short'));
              }
              else
              {
                props.durationFunction(props.duration.concat('Short'));
              }
            }}
            title={durationLimits.filter(duration => duration.id == "Short").map(duration => duration.label)[0]}/>
        </View>
        <View style={styles.modalButtonWrapper}>       
          <Button
            buttonStyle={props.duration.indexOf('Medium') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.duration.indexOf('Medium') > -1)
              {
                props.durationFunction(props.duration.filter(item => item != 'Medium'));
              }
              else
              {
                props.durationFunction(props.duration.concat('Medium'));
              }
            }}
            title={durationLimits.filter(duration => duration.id == "Medium").map(duration => duration.label)[0]}/>
        </View>
        <View style={styles.modalButtonWrapper}>       
          <Button
            buttonStyle={props.duration.indexOf('Long') > -1 ? styles.selectedFilterButton : styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              if (props.duration.indexOf('Long') > -1)
              {
                props.durationFunction(props.duration.filter(item => item != 'Long'));
              }
              else
              {
                props.durationFunction(props.duration.concat('Long'));
              }
            }}
            title={durationLimits.filter(duration => duration.id == "Long").map(duration => duration.label)[0]}/>
        </View>
      </View>
    </View>
  );
};

const FilterModal = (props) => {
  const [newDifficulty, setNewDifficulty] = useState([]);
  const [newLanguage, setNewLanguage] = useState([]);
  const [newTopics, setNewTopics] = useState([]);
  const [newDuration, setNewDuration] = useState([]);

  return (
    <View style={styles.modalView}>
      <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.visibleFunction(!props.visible);
      }}>
        <View style={styles.modal}>
          <ScrollView>
          { props.filterBy.indexOf("Difficulty") > -1 ? 
            <DifficultyOptions 
              originalProps={props}
              difficultyFunction={setNewDifficulty}
              difficulty={newDifficulty}
              /> : null }
          { props.filterBy.indexOf("Language") > -1 ? 
            <LanguageOptions 
              originalProps={props}
              languageFunction={setNewLanguage}
              language={newLanguage}
              /> : null }
          { props.filterBy.indexOf("Topic") > -1 ? 
            <TopicOptions 
              originalProps={props}
              topicsFunction={setNewTopics}
              topics={newTopics}
              /> : null }
          { props.filterBy.indexOf("Duration") > -1 ? 
            <DurationOptions 
              originalProps={props}
              durationFunction={setNewDuration}
              duration={newDuration}
              /> : null }

          <View style={styles.horizontalButtonLayout}>   
            <View style={styles.modalButtonWrapper}>        
              <Button
                buttonStyle={styles.modalButtons}
                titleStyle={styles.buttonText}
                onPress={() => {
                  props.visibleFunction(!props.visible);
                }}
                title="Cancel"/>
            </View>
            <View style={styles.modalButtonWrapper}> 
              <Button
                buttonStyle={styles.modalButtons}
                titleStyle={styles.buttonText}
                onPress={() => {
                  let currentFilterSettings = {
                    difficultyFilter: newDifficulty,
                    languageFilter: newLanguage,
                    topicFilter: newTopics,
                    durationFilter: newDuration
                  };
                  props.filterSettingsFunction(currentFilterSettings);
                  props.filteredListFunction(getFilteredContent(props.allData, props.filterBy, currentFilterSettings));
                  props.visibleFunction(!props.visible);
                }}
                title="Update Filter"/>
            </View>
            </View>
            </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FilterModal;

export const getFilteredContent = function(allData, filterBy, filterSettings) {
  // Start with all the data
  let newList = allData;
  
  if (filterBy.indexOf("Difficulty") > -1) {
    if (filterSettings.difficultyFilter.length != 0) {
      // If there is a set difficulty filter, check if the content's difficulty is one of the selected ones
      newList = newList.filter(item => filterSettings.difficultyFilter.indexOf(item.difficulty) > -1);
    }
  }

  if (filterBy.indexOf("Language") > -1) {
    if (filterSettings.languageFilter.length != 0) {
      // If there is a set language filter, check if the content's language is one of the selected ones
      newList = newList.filter(item => filterSettings.languageFilter.indexOf(item.language) > -1);
    }
  }

  if (filterBy.indexOf("Topic") > -1) {
    if (filterSettings.topicFilter.length != 0) {
      // If there is a set topic filter, check if any of the content's topics are one of the selected ones
      newList = newList.filter(item => filterSettings.topicFilter.some(topic => item.topics.indexOf(topic) > -1));
    }
  }

  if (filterBy.indexOf("Duration") > -1) {
    if (filterSettings.durationFilter.length != 0) {
      // If there is a set duration filter, check if the content's duration falls into one of the selected ranges
      let contentIDs = [];
      // Get the short, medium, and long duration limit objects
      let short = durationLimits.filter(duration => duration.id == "Short")[0];
      let medium = durationLimits.filter(duration => duration.id == "Medium")[0];
      let long = durationLimits.filter(duration => duration.id == "Long")[0];

      // Depending on the ranges selected, get the contentIDs of content that fall within the range
      if (filterSettings.durationFilter.indexOf("Short") > -1) {
        contentIDs = contentIDs.concat(newList.filter(item => item.duration >= short.min && item.duration < short.max).map(item => item.contentID));
      }
      if (filterSettings.durationFilter.indexOf("Medium") > -1) {
        contentIDs = contentIDs.concat(newList.filter(item => item.duration >= medium.min && item.duration < medium.max).map(item => item.contentID));
      }
      if (filterSettings.durationFilter.indexOf("Long") > -1) {
        contentIDs = contentIDs.concat(newList.filter(item => item.duration >= long.min).map(item => item.contentID));
      }
      
      // Filter by the list of contentIDs
      newList = newList.filter(item => contentIDs.indexOf(item.contentID) > -1);
    }
  }
  
  // Return the new list of filtered content
  return newList;
};