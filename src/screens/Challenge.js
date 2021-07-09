import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, CheckBox, ButtonGroup} from "react-native";
import Controller from "../components/Controller";
import PlayerSlider from "../components/PlayerSlider";
import Tags from '../components/Tags';
import { styles } from '../styles/Styles';
import { Button } from 'react-native-elements';
import ContentList from '../components/ContentList';
import LoadingSpinner from '../components/LoadingSpinner';
import * as firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/storage";
import ChallengeButtons from "../components/ChallengeDayList";
import { Checkbox } from 'react-native-paper';
import ChallengeDayList from '../components/ChallengeDayList';
import { DrawerItemList } from "@react-navigation/drawer";

const Challenge = ({route}, props) => {

  const theContentID = route.params.contentID;
  
  console.log("Route id: " + route.params.numDays);

  const item = route.params;
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const theStartDate = item.startDate.toDate().toString().slice(4, 15);
  const theEndDate = item.endDate.toDate().toString().slice(4, 15);

  useEffect(() => {
    const fetchList = async () => {
      const dbh = firebase.firestore();
      
      dbh.collection("challengeDays").get()
      .then((querySnapshot) => {

        console.log("Snapshot size:" + querySnapshot.size)

        if (querySnapshot.size == 0) {
          setIsLoaded(true);
        }
        else {
          let countChallenges = 0;
          querySnapshot.forEach((doc) => {
            let newDoc = doc.data();
            newDoc.contentID = doc.id;


            console.log("Linked to" + newDoc.contentID);
            const chalref = newDoc.challenge.id;
            console.log("Challenge ID is " + chalref);
            //chalref is the challenge ID
            //theContentID is what the day is linked to 
            
            
            

            // https://firebase.google.com/docs/storage/web/download-files
            let storage = firebase.storage();
            let pathReference = storage.ref(newDoc.description);
            
            pathReference.getDownloadURL()
            .then((url) => {
              newDoc.description = url;
            })
            .catch((error) => {
              newDoc.description = "Relax";
            })
            .finally(() => {
        

              if(chalref == theContentID){
              countChallenges++;
              setData(oldList => [...oldList, newDoc]);
              }

              if(countChallenges == route.params.numDays){
                
                console.log("this is new doc" + newDoc.description)
                
                console.log("challenge matches with challenge day" + theContentID);
                setIsLoaded(true);
              }

            });
          })
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    };
  
    fetchList();  
  }, []);

  
  return (
    <View style={styles.fullWidthWindow}>
     
      <Image source={{ uri: item.imagePath }}
        style={styles.challengePhoto}></Image>
       <Tags difficulty={item.difficulty} topics={item.topics}></Tags>
      <Text style={styles.contentTitle}>{item.title}</Text> 
      <Text style={styles.contentDesc}>{item.description}{"\n"}</Text>
      <Text>Challenge starts on: {theStartDate}</Text>
      <Text>Challenge ends on: {theEndDate}</Text>
      <Text>This challenge is {route.params.numDays} day(s) long {"\n"}</Text>
      <View style={styles.app}>
    {
      isLoaded ? 
        <ChallengeDayList 
          contentComponent="ChallengeDay"
          navigation={props.navigation}
          contentType="Challenges"
          data={data.sort((docA, docB) => docB.dateAdded - docA.dateAdded)}
          filterBy="Difficulty,Language,Topic" />
        : <LoadingSpinner />
    }
    </View>

    </View>

  );
};

export default Challenge;
