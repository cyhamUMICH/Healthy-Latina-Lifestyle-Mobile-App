//https://heartbeat.fritz.ai/chat-app-with-react-native-part-4-create-chat-ui-screens-with-react-native-gifted-chat-7ef428a60d30
//https://heartbeat.fritz.ai/chat-app-with-react-native-part-5-create-and-fetch-real-time-messages-with-firestore-86fb012edaf5
// a lot of what I do here is based heavily on this guide
import React, { useState,useContect, useEffect } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { colors } from '../styles/Colors';
import firebase, { auth } from 'firebase';
import 'firebase/firestore';
import 'firebase/storage';

export default function ChatScreen({route}) {
const { thread } = route.params;
  const [messages, setMessages] = useState([]);

function getStuff(documentSnapshot){
                return documentSnapshot.get('username');
                }
  // helper method that is sends a message
  function handleSend(messages) {
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
  }

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
      });
    return () => messagesListener();
  }, []);


  function renderBubble(props){
  return (
  <Bubble
  {...props}
  wrapperStyle = {{
  right:{backgroundColor: colors.accentBackground}
  }}
  />
  );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: firebase.auth().currentUser.uid }}
      renderBubble = {renderBubble}
      alwaysShowSend
      scrollToBottom
    />
  );
}
