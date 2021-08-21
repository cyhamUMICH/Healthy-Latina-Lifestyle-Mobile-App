//https://heartbeat.fritz.ai/chat-app-with-react-native-part-4-create-chat-ui-screens-with-react-native-gifted-chat-7ef428a60d30
//https://heartbeat.fritz.ai/chat-app-with-react-native-part-5-create-and-fetch-real-time-messages-with-firestore-86fb012edaf5
// a lot of what I do here is based heavily on this guide
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { GiftedChat, Bubble, MessageText } from 'react-native-gifted-chat';
import Lightbox from '../utilities/Lightbox';
import { styles } from '../styles/Styles';
import { colors } from '../styles/Colors';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

export default function ChatScreen({route}) {
  const { navigation, thread } = route.params;
  const [messages, setMessages] = useState([]);

  const getContent = (currentMessage) => {
    return new Promise((resolve, reject) => {
      const dbh = firebase.firestore();
      dbh.collection(currentMessage.contentCollection).doc(currentMessage.contentID).get()
      .then((doc) => {

        if (doc.exists) {
          let newDoc = doc.data();
          newDoc.contentID = doc.id;
          // if the image is attached, send that one along
          if (currentMessage.image) {
            newDoc.imagePath = currentMessage.image;
            resolve(newDoc);
          }
          // else if the image isn't attached, try to get it again
          // This might happen if there was a problem getting the image upon sending the content (Firebase Storage network error, etc.)
          else {
            if (newDoc.imagePath !== "") {
              // https://firebase.google.com/docs/storage/web/download-files
              let storage = firebase.storage();
              let pathReference = storage.ref(newDoc.imagePath);
              pathReference.getDownloadURL()
              .then((url) => {
                newDoc.imagePath = url;
              })
              .catch((error) => {
                newDoc.imagePath = "";
              })
              .finally(() => {
                resolve(newDoc);
              });
            }
            else {
              newDoc.imagePath = "";
              resolve(newDoc);
            }
          }
        }
        else {
          reject("Content doesn't exist.");
        }
      })
      .catch((error) => {
        reject("Error with content: " + error);
      });
    });
  };

  const goToContent = async (currentMessage) => {
    await getContent(currentMessage)
    .then((item) => {
      // Add any content that will require another layer of navigation to this if condition.
      if(currentMessage.contentComponent === "Challenge" || currentMessage.contentComponent === "Course" || currentMessage.contentComponent === "JournalEntry") {
        navigation.navigate(currentMessage.contentComponent, {
          item: item,
          navigation: navigation
        });
      }
      else {
        navigation.navigate(currentMessage.contentComponent, item);
      }
    })
    .catch((error) => {
      Alert.alert(
        "Error Navigating to the Content",
        "There was an error when navigating to the content. " + error,
        [
          {text: "OK"}
        ]
      );
    });
  };

  // helper method that is sends a message
  const handleSend = (messages) => {
    const text = messages[0].text;
    var currentUser = firebase.auth().currentUser;

    firebase.firestore()
      .collection('Groups')
      .doc(thread._id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          username: currentUser.displayName
        }
      });
  };

useEffect(() => {

    const messagesListener = firebase.firestore()
      .collection('Groups')
      .doc(thread._id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.username
            };
          }

          return data;
        });

        setMessages(messages);
      })
    return () => messagesListener();
  }, []);

  const renderMessageText = (props) => {
    if (props.currentMessage.contentID)
      return (
        <TouchableOpacity onPress={() => goToContent(props.currentMessage)} style={{color: colors.text}}>
          <MessageText {...props}     
          textStyle={{
            left: { color: colors.text, textDecorationLine: 'underline' },
            right: { color: colors.leftChatText, textDecorationLine: 'underline' },
          }} />
        </TouchableOpacity>
      );
    else
      return (
        <MessageText {...props}/>
      )
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: { backgroundColor: colors.modalButtons }
        }}
      />
    );
  };

  const renderMessageImage = (props) => {
    return (
      // Copied from: https://github.com/FaridSafi/react-native-gifted-chat/blob/master/src/MessageImage.tsx
      <View>
        <Lightbox
          activeProps={{
            style: {flex: 1, resizeMode: 'contain'},
          }}
          {...props.lightboxProps}
        >
        <Image
          {...props.imageProps}
          style={styles.chatImage}
          source={{ uri: props.currentMessage.image }} />
        </Lightbox>
      </View>
    );
  };

  return (
    <GiftedChat 
      messages={messages}
      onSend={handleSend}
      user={{ _id: firebase.auth().currentUser.uid }}
      renderBubble={renderBubble}
      renderMessageText={renderMessageText}
      renderMessageImage={renderMessageImage}
      keyboardShouldPersistTaps='never'
      alwaysShowSend
      scrollToBottom
    />
  );
}
