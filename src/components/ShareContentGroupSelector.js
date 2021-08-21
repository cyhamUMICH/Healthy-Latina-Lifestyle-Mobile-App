import React from 'react';
import { Modal, ScrollView, View, Text, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { styles } from '../styles/Styles';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';

const GroupOptions = (props) => {
  return (
    <View style={styles.modalSection}>
      <Text style={styles.modalText}>Select a Group...</Text>
      <View style={styles.horizontalButtonLayout}> 
          {
            props.groupsList.sort().map(item =>  
              <View key={item._id} style={styles.horizontalSpaceButtonWrapper}>         
                <Button
                  buttonStyle={styles.button}
                  titleStyle={styles.buttonText}
                  onPress={() => {
                    var currentUser = firebase.auth().currentUser;

                    firebase.firestore()
                      .collection('Groups')
                      .doc(item._id)
                      .collection('MESSAGES')
                      .add({
                        text: "I wanted to share this " + props.sendItem.contentType.toLowerCase() 
                          + " called " + props.sendItem.item.title + " with you. Click on this text to check it out!",
                        createdAt: new Date().getTime(),
                        user: {
                          _id: currentUser.uid,
                          username: currentUser.displayName
                        },
                        image: props.sendItem.item.imagePath ? props.sendItem.item.imagePath : "",
                        contentCollection: props.sendItem.contentCollection,
                        contentComponent: props.sendItem.contentComponent,
                        contentID: props.sendItem.item.contentID
                      })
                      .catch((error) => {
                        Alert.alert(
                          "Error Sharing Content",
                          "An error has occurred when sharing this content. " + error,
                          [
                            {text: "OK"}
                          ]
                        );
                      });

                    props.visibleFunction(!props.visible);
                  }}
                  title={item.name}/>
              </View>
            )
          }     
      </View>
    </View>
  );
};

const ShareContentGroupSelector = (props) => {
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
            { props.groupsList.length > 0 ? 
              <GroupOptions 
                groupsList={props.groupsList} 
                sendItem={props.sendItem} 
                visible={props.visible}
                visibleFunction={props.visibleFunction} /> 
              : 
              <View style={styles.groupSelectorErrorTextView}>
                <Text style={styles.modalText}>There are no available groups to share content with. Please first join or create a group to share content.</Text>
              </View>    
            }
            <View style={styles.horizontalSpaceButtonWrapper}>        
              <Button
                buttonStyle={styles.modalButtons}
                titleStyle={styles.buttonText}
                onPress={() => {
                  props.visibleFunction(!props.visible);
                }}
                title="Cancel"/>
            </View>
          </ScrollView>
          </View>
      </Modal>
    </View> 
  );
};

export default ShareContentGroupSelector;