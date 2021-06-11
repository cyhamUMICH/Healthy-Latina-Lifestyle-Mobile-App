import React from 'react';
import { View } from "react-native";
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';

const TopicButtons = (props) => {
  return(
    <View style={styles.horizontalButtonLayout}> 
          {
            props.topicsList.sort().map(topic =>  
              <View key={topic} style={styles.horizontalSpaceButtonWrapper}>         
                <Button
                  buttonStyle={props.topics.indexOf(topic) > -1 ? styles.selectedFilterButton : styles.button}
                  titleStyle={props.topics.indexOf(topic) > -1 ? styles.selectedFilterButtonText : styles.buttonText}
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
  );
};

export default TopicButtons;